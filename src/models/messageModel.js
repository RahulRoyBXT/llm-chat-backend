const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    chatId: {
        type: String,
        required: true, // Format: `${senderId}_${receiverId}`
    },
    uniqueId: {
        type: String, required: true
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
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read']
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt: {
        type: Date,
    },
    readAt: {
        type: Date
    }

},
    {timestamps: true}
)

// Index for fast search & retrievals
// messageSchema.index({ chatId:1, timestamp: -1 })

module.exports = mongoose.model('Message', messageSchema)