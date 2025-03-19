const express = require('express')
const { sendMessage, getMessage } = require('../controllers/messageController.js')

const router = express.Router()

router.post('/send', sendMessage) // send message
router.get('/:chatId', getMessage) // Get Messages for a chat

module.exports = router