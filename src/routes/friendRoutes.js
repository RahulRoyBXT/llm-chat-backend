const express = require('express')
const { sendFriendRequest, acceptFriedRequest, rejectFriendRequest, getFriendList } = require('../controllers/friendController.js')

const router = express.Router()


router.post('/send', sendFriendRequest); // send Friend Request 
router.post('/accept', acceptFriedRequest) // Accept Friend Request
router.post('/reject', rejectFriendRequest) // Reject Request
router.get('/list/:userId', getFriendList) // Get user's Friend List

module.exports = router;