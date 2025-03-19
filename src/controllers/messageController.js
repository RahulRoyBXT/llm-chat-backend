const Message = require('../models/messageModel.js')

// Send Message
exports.sendMessage = async (req, res)=> {
    
    try {
        const { sender, receiver, content } = req.body
        if(!sender || !receiver || !content) return res.status(401).json({ message: 'Enough data was not provided'})
        
        const chatId = [sender, receiver].sort().join('_') // Doing this for consistent chatId 
        
        const newMessage = await Message.create({
            chatId,
            sender,
            receiver,
            content
        })
        res.status(201).json(newMessage)
        
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

// Get Message (Added Pagination) // I Have to add infinity scroll

exports.getMessage = async (req, res)=> {
    console.log('worked')
    try {
        const { chatId } = req.params
        console.log(chatId)
        const { lastTimestamp } = req.query  // Added for page

        const query = { chatId }
        console.log('query:', query)
        if( lastTimestamp) query.timestamp = { $lt: lastTimestamp} // review 

        const message = await Message.find(query)
        .sort({ timestamp: -1})
        .limit(20)
        // What I am doing here is fetching latest one first
        // and Load only 20 messages
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Message is not Available'})
    }
}