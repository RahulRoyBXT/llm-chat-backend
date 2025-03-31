const express = require('express')
const { sendFriendRequest, acceptFriedRequest, rejectFriendRequest, getFriendList, removeFriends } = require('../controllers/friendController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router()


router.post('/send', sendFriendRequest); // send Friend Request 
router.post('/accept', acceptFriedRequest) // Accept Friend Request
router.post('/reject', rejectFriendRequest) // Reject Request
router.get('/list/:userId', getFriendList) // Get user's Friend List

router.delete('/remove/friends/:friendId',protect, removeFriends)

module.exports = router;