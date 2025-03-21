const express = require('express')
const { sendMessage, getMessages } = require('../controllers/messageController.js')

const router = express.Router()

router.post('/send', sendMessage) // send message
router.get('/:chatId', getMessages) // Get Messages for a chat

module.exports = router