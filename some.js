const { createClient } = require("redis");
const Message = require("../models/messageModel.js");

// Redis Client
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Send Message
exports.sendMessage = async (req, res) => {
  setTimeout(async () => {
    try {
      const { uniqueId, senderId, receiverId, content } = req.body;
      if (!uniqueId || !senderId || !receiverId || !content) {
        return res.status(401).json({ message: "Enough data was not provided" });
      }

      const chatId = [senderId, receiverId].sort().join("_");

      const newMessage = new Message({
        uniqueId,
        chatId,
        sender: senderId,
        receiver: receiverId,
        content,
        status: "sent",
      });

      // await newMessage.save();

      // // Cache Message in Redis (Keep Last 50 Messages)
      // const messageKey = `chat:${chatId}`;
      // await redisClient.lPush(messageKey, JSON.stringify(newMessage));
      // await redisClient.lTrim(messageKey, 0, 49);

      res.status(201).json({ message: "Message sent successfully", data: newMessage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }, 3000);
};

// Get Messages (With Redis & Pagination for Infinite Scroll)
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { lastTimestamp } = req.query;

    // const messageKey = `chat:${chatId}`;
    // let cachedMessages = await redisClient.lRange(messageKey, 0, -1);

    // if (cachedMessages.length > 0) {
    //   cachedMessages = cachedMessages.map((msg) => JSON.parse(msg));
    //   return res.status(200).json(cachedMessages);
    // }

    const query = { chatId };
    if (lastTimestamp) query.sentAt = { $lt: new Date(lastTimestamp) };

    const messages = await Message.find(query).sort({ sentAt: -1 }).limit(40);
    // if (messages.length > 0) {
    //   const messagesToCache = messages.map((msg) => JSON.stringify(msg));
    //   await redisClient.lPush(messageKey, ...messagesToCache);
    //   await redisClient.lTrim(messageKey, 0, 49);
    // }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Messages not available" });
  }
};
