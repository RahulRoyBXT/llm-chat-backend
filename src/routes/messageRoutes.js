const express = require('express')
const { sendMessage, getMessages, getMissedMessages } = require('../controllers/messageController.js')

const router = express.Router()

router.post('/send', sendMessage) // send message
router.get('/:chatId', getMessages) // Get Messages for a chat
router.get('/getmissedmessages', getMissedMessages)

module.exports = router