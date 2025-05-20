const Message = require("../models/messageModel.js");
const { generateRoomId } = require("../utils/generateRoomId.js");
module.exports = (socket, io, redis) => {
  socket.on("load-messages", async ({ userId, otherUserId }) => {
    const roomId = generateRoomId(userId, otherUserId);
    redisKey = `chat:${roomId}`;

    // Get recent from Redis
    const cached = await redis.lRange(redisKey, 0, 49);
    const redisMessage = cached.map((msg) => JSON.parse(msg));
    const redisIds = new Set(redisMessage.map((msg) => msg.uniqueId));

    // Fetch remaining from Mongo DB
    const remaining = 50 - redisMessage.length;

    const dbmessages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    })
      .sort({ timestamp: -1 }) // Newest First
      .limit(100); // Over-fetch to filter

    // Remove Duplicates
    const filtered = dbmessages.filter((msg) => !redisIds.has(msg.uniqueId));

    const finalMessages = [...redisMessage, ...filtered.slice(0, remaining)];

    socket.to(userId).emit("chat-history", finalMessages.reverse());
  });
};
