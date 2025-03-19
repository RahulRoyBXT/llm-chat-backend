require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
// const { promisify } = require('util');

const messageRoutes = require('./routes/messageRoutes.js')
const friendRoutes = require('./routes/friendRoutes.js')

const allUserRotes = require('./routes/fetchAllUserRoutes.js')

const multer = require("multer");
const pdfParse = require("pdf-parse");

const axios = require("axios");
const {ChromaClient} = require("chromadb");

const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");
const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

// initialize express app
connectDB();
const app = express();
const server = http.createServer(app);
app.use(cookieParser());

// (async () => {
//   await pubClient.connect();
//   await subClient.connect();
//   io.adapter(createAdapter(pubClient, subClient));
// })();

// Apply rate limiting globally

// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "You have exceeded the 100 requests in 15 minutes limit!",
// });

// middleware
app.use(cors({
  origin: "http://192.168.179.192:5173",
  credentials: true,  // Ensure this is `true`
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());
app.use(morgan("dev"));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Apply to all requests
// app.use(apiLimiter);

// error handler
app.use(errorHandler);


// Configure storage for PDF uploads

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize ChromaDB for vector search
const chroma = new ChromaClient();
const collectionName = "pdf_collection";

// Store extracted pdf text


const pdfText = {};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  allowEIO3: true, // Temporary compatibility fix
});

// Socket.io middleware to verify the jwt token
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    socket.user = decoded;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("Transport protocol:", socket.conn.transport.name);
  console.log("A User is connected", socket.id);

  socket.on("message", (data) => {
    if (
      data.startsWith("gpt") ||
      data.startsWith("GPT") ||
      data.startsWith("Gpt")
    ) {
      const FilteredData = data
        .toLocaleLowerCase()
        .substring(3, data.length)
        .trimStart();
      return socket.emit(
        "message",
        `I am a bot, I am not able to process your request. Is this your request? ${FilteredData}`
      ); // Emit to the user who sent the message
    }
    if (data === "hi") {
      // socket.broadcast.emit("message", data) // Broadcast to all users
      return socket.emit("message", "Hello, how can I help you?"); // Emit to the user who sent the message
    }
    socket.broadcast.emit("message", data); // Broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});



// routes
app.use("/api/users", require("./routes/userRoutes"));

app.use('/api/friends', friendRoutes)  // Friend Section
app.use('/api/message', messageRoutes) // Messages Section
app.use('/api', allUserRotes) // Grab all user



// Upload PDF file

app.post("/upload", upload.single("pdf"), async (req, res) => {
  console.log('File received:', req.file); 
  if (!req.file || req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'No valid PDF file uploaded' });
  }
  console.log(req.file.mimetype);
  try {
    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    // Storing text in memory
    pdfText[req.file.originalname] = text;

    res.json({ message: 'PDF uploaded and processed successfully', length: text.length });

  } catch (error) {
    console.error('Error processing PDF:', error); // Log the error
    res.status(500).json({ error: 'Failed to process pdf' });
  }
});

// Query LLaMA model
app.post('/query', async (req, res) => {
  const {query} = req.body;
  if(!query){
    return res.status(400).json({error: 'Query is required'});
  }

  try {
    // calling llama model
    const response = await axios.post('http://llama:11434/api/generate', {
      model: "llama2",
      prompt: query,
      stream: false
    });

    res.json({response: response.data.response || 'No response from LLaMA model'});

  } catch (error) {
    res.status(500).json({error: 'Failed to process query'});
  }
})


// Query pdf content

app.post("/pdf-query", async (req, res) => {
  const {query, filename} = req.body;

  if(!query || !filename || !pdfText[filename]){
    return res.status(400).json({error: 'Query and filename are required'});
  }

  try {
    const pdfContent = pdfText[filename];
    const response = await axios.post('http://llama:11434/api/generate', {
      model: "llama2",
      prompt: `Based on the PDF content, answer this: "${query}"\n\n${pdfContent}`,
      stream: false
    });

    res.json({response: response.data.response || 'No response from LLaMA model'});

  } catch(error) {
    res.status(500).json({error: 'Failed to generate response from pdf'});
  }
})


// server

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  await pubClient.connect();
  await subClient.connect();
  io.adapter(createAdapter(pubClient, subClient));
  console.log(`Server is running on port http://localhost:${PORT}`);
});
