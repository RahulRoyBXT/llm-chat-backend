const Message = require('../models/messageModel.js')


// Send Message
exports.sendMessage = async (req, res)=> {
      setTimeout(async ()=> {try {
      const {uniqueId, senderId, receiverId, content } = req.body
      if(!uniqueId || !senderId || !receiverId || !content) return res.status(401).json({ message: 'Enough data was not provided'})
      
      const chatId = [senderId, receiverId].sort().join('_') // Doing this for consistent chatId 
      
      const newMessage = new Message({
          uniqueId: uniqueId,
          chatId,
          sender: senderId,
          receiver: receiverId,
          content,
          status: 'sent'
      })

      await newMessage.save()

      res.status(201).json({message: 'Message sent successfully', data: newMessage})
      
  } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: error.message})
  } },3000)
}


// Get Message (Added Pagination) // I Have to add infinity scroll

exports.getMessages = async (req, res) => {
    try {
      const { chatId } = req.params;
      const { lastTimestamp } = req.query; // For pagination
  
      // Base query
      const query = { chatId };
  
      // Add pagination filter: Fetch messages older than `lastTimestamp`
      if (lastTimestamp) {
        query.sentAt = { $lt: new Date(lastTimestamp) };
      }
  
      const messages = await Message.find(query)
        .sort({ sentAt: 1 }) // Get newest messages first
        .limit(40)
      // Format the response
      const formattedMessages = messages.map((msg) => ({
          uniqueId: msg.uniqueId,
          chatId: msg.chatId,
          sender: msg.sender,
          receiver:  msg.receiver,
          content: msg.content,
          status: msg.status,
          timestamp: new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: new Date(msg.sentAt).toISOString().split("T")[0], // Fixed: `.split('T')`
      }));
  
      res.status(200).json(formattedMessages);
    } catch (error) {
      res.status(500).json({ error: error.message || "Messages are not available" });
    }
  };
  