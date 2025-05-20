const { createClient } = require("redis");
const redisClient = createClient();
redisClient.connect().catch(console.error);

const Message = require("../models/messageModel.js");
const { generateNewMessage } = require("../utils/generateNewMessages.js");
const { generateRoomId } = require("../utils/generateRoomId.js");

// Send Message
exports.sendMessage = async (req, res) => {
    try {
      const { uniqueId, senderId, receiverId, content } = req.body;
      if (!uniqueId || !senderId || !receiverId || !content)
        return res
          .status(401)
          .json({ message: "Enough data was not provided" });

      const chatId = generateRoomId(senderId, receiverId) // Doing this for consistent chatId

      const newMessage = generateNewMessage({uniqueId, senderId, receiverId, content, chatId})

      await newMessage.save();

      res
        .status(201)
        .json({ message: "Message sent successfully", data: newMessage });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
};

// Get Message (With Redis Cache & Pagination) // I Have to add infinity scroll

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { lastTimestamp } = req.query; // For pagination

    // Try fetching messages from Redis cache

    const messageKey = `chat:${chatId}`;
    let cachedMessage = await redisClient.lRange(messageKey, 0, -1);

    if (cachedMessage.length > 0) {
      cachedMessage = cachedMessage.map((msg) => JSON.parse(msg));
    }

    // Base query
    const query = { chatId };

    // Add pagination filter: Fetch messages older than `lastTimestamp`
    if (lastTimestamp) {
      query.sentAt = { $lt: new Date(lastTimestamp) };
    }

    const messages = await Message.find(query)
      .sort({ sentAt: 1 }) // Get newest messages first
      .skip(cachedMessage.length) // already cached
      .limit(50 - cachedMessage.length);

    // Format the response
    const formattedMessages = messages.map((msg) => ({
      uniqueId: msg.uniqueId,
      chatId: msg.chatId,
      sender: msg.sender,
      receiver: msg.receiver,
      content: msg.content,
      status: msg.status,
      timestamp: new Date(msg.sentAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date(msg.sentAt).toISOString().split("T")[0], // Fixed: `.split('T')`
    }));

    const allMessages = [...cachedMessage, ...formattedMessages].sort(
      (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
    );

    res.status(200).json(allMessages);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Messages are not available" });
  }
};

exports.getMissedMessages = async (userId) => {
  try {
    const lastSeen = await redisClient.get(`lastSeen:${userId}`);
    const lastSeenTime = lastSeen ? new Date(lastSeen) : new Date(0);

    // Get messages sent after the last seen time
    const missedMessages = await Message.find({
      receiver: userId,
      sentAt: { $gt: lastSeenTime },
    }).sort({ sentAt: 1 });

    return missedMessages; // Return the missed messages instead of sending a response
  } catch (error) {
    console.error("Error fetching missed messages:", error.message);
    return [];
  }
};