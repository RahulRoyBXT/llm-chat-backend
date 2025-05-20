const express = require('express')
const { 
  sendFriendRequest, 
  acceptFriedRequest, 
  rejectFriendRequest, 
  getFriendList, 
  removeFriends, 
  getPendingRequests, 
  getReceivedRequests,
  cancelFriendRequest
} = require('../controllers/friendController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router()


router.post('/send', sendFriendRequest); // send Friend Request 
router.post('/accept', acceptFriedRequest) // Accept Friend Request
router.post('/reject', rejectFriendRequest) // Reject Request
router.post('/cancel', cancelFriendRequest) // Cancel outgoing Friend Request
router.get('/list/:userId', getFriendList) // Get user's Friend List
router.get('/pending/:userId', getPendingRequests) // Get pending (outgoing) requests
router.get('/received/:userId', getReceivedRequests) // Get received (incoming) requests

router.delete('/remove/friends/:friendId',protect, removeFriends)

module.exports = router;