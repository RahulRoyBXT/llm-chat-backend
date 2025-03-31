require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const messageRoutes = require("./routes/messageRoutes.js");
const friendRoutes = require("./routes/friendRoutes.js");
const allUserRoutes = require("./routes/fetchAllUserRoutes.js");

const http = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

// Initialize Express App
connectDB();
const app = express();
const server = http.createServer(app);

// Redis Setup
const pubClient = createClient();
const subClient = pubClient.duplicate();
pubClient.connect().catch(console.error);
subClient.connect().catch(console.error);

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "process.env.FRONTEND_ORIGIN_URL",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(morgan("dev"));

// Routes
// Error Handler
app.use(errorHandler);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/friends", friendRoutes);
app.use("/api/message", messageRoutes);
app.use("/api", allUserRoutes);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "process.env.FRONTEND_ORIGIN_URL",
    credentials: true,
  },
});
io.adapter(createAdapter(pubClient, subClient));

// Redis Client for Socket Operations
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Socket.io Logic
io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  // Store User Connection in Redis
  socket.on("user_connected", async (userId) => {
    await redisClient.set(`user:${userId}`, socket.id);
    // console.log(`User ${userId} is online`);
  });

  // Handle User Disconnection
  socket.on("disconnect", async () => {
    const keys = await redisClient.keys("user:*");
    for (const key of keys) {
      const socketId = await redisClient.get(key);

      if (socketId === socket.id) {
        const userId = key.split(":")[1];
        await redisClient.set(`lastSeen:${userId}`, new Date().toISOString()); // Update lastSeen
        await redisClient.del(key); // Removed User Session
        // console.log(`User ${key.split(":")[1]} disconnected`);
      }
    }
  });

  // Send Message
  socket.on(
    "send_message",
    async ({
      uniqueId,
      sender,
      receiver,
      content,
      timestamp,
      date,
      status,
    }) => {
      console.log(
        "From Front-end: ",
        uniqueId,
        sender,
        receiver,
        content,
        timestamp,
        date,
        status
      );

      const senderSocketId = await redisClient.get(`user:${sender}`);
      const receiverSocketId = await redisClient.get(`user:${receiver}`);

      const message = {
        uniqueId,
        sender,
        receiver,
        content,
        timestamp,
        status: "sent",
      };

      const chatId = [sender, receiver].sort().join("_");
      // Cache Message in Redis
      const messageKey = `chat:${chatId}`; // Convert to plain JSON
      await redisClient.rPush(messageKey, JSON.stringify(message));
      await redisClient.lTrim(messageKey, -20, -1);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", message);
        console.log("send to receiver ${receiver}", message);
      }
    }
  );

  // Sync Messages When User Comes Online
  socket.on("user_online", async (userId) => {
    try {
      const recipientSocketId = await redisClient.get(`user:${userId}`);
      if (!recipientSocketId) return;

      // Fetch undelivered messages
      const unsyncedMessages = await Message.find({
        receiver: userId,
        sender: { $ne: userId }, // Only messages sent by others
        status: { $ne: "delivered" },
      });

      for (let msg of unsyncedMessages) {
        io.to(recipientSocketId).emit("receive_message", msg);
        await Message.updateOne(
          { _id: msg._id },
          { status: "delivered", deliveredAt: new Date() }
        );
      }
    } catch (error) {
      console.error("Error syncing messages:", error);
    }
  });
});

// Server Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
