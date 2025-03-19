const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true, // Format: `${senderId}_${receiverId}`
    },
    sender: {
        type: mongoose.Types.ObjectId, ref: 'User', required: true
    },
    receiver: {
        type: mongoose.Types.ObjectId, ref: 'User', required: true
    },
    content: { 
        type: String, required: true
    },
},
    {timestamps: true}
)

// Index for fast search & retrievals
messageSchema.index({ chatId:1, timestamp: -1 })

module.exports = mongoose.model('Message', messageSchema)