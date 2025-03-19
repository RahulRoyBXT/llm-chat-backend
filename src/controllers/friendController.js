const mongoose = require('mongoose')
const FriendRequest = require('../models/friendRequestModel.js')
const User = require('../models/userModel.js')

// Send Friend Request

exports.sendFriendRequest = async (req, res) => {

    try {
        console.log(req.body)
        const {senderId, receiverId } = req.body

        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ error: "Invalid user ID" });
          }

        if(!senderId || !receiverId) return res.status(401).json({ message: 'senderId or receiverId is not available'})
        if(senderId === receiverId) return res.status(400).json({ message: "You can't request to yourself."})
        
        // Checking if request already exist
        const existingRequest = await FriendRequest.findOne({ sender: senderId, receiver: receiverId})
        if(existingRequest) return res.status(400).json({message: ' Friend Request Already Sent.'})
        console.log('Not created')
        const newRequest = await FriendRequest.create({
            sender: senderId,
            receiver: receiverId
        })
        console.log('created')

        res.status(201).json({ message: newRequest})

    } catch (error) {
        console.log('hello')
        res.status(500).json({error: error.message})
    }
}

// Accept Friend Request
exports.acceptFriedRequest = async (req, res) => {
    try {
        const {requestId} = req.body
        if(!requestId) return res.status(401).json({ message: 'requestId is not available'})
        
        const request = await FriendRequest.findById(requestId)
        if(!request) return res.status(404).json({ message: 'Request is not Found'})

        request.status = "accepted"
        request.save()

        // Add each other as friends
        await User.findByIdAndUpdate( request.sender, { $push: { friends: request.receiver }})
        await User.findByIdAndUpdate( request. receiver, { $push: { friends: request.sender }})

        res.status(200).json({ message: 'Friend request accepted.'})

    } catch (error){
        res.status(500).json({ error: error.message})
    }
}

// Reject Friend Request
exports.rejectFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.body
        if(!requestId) return res.status(401).json({ message: 'requestId is not available '})
        const request = await FriendRequest.findById(requestId)
        if(!request) return res.status(404).json({ message: 'Request is not found'})
        
        request.status = 'rejected'
        await request.save()

        res.status(200).json({ message: 'Friend request rejected'})

    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

// Get all Friend List

exports.getFriendList = async (req, res)=> {
    try {
        const {userId } = req.params
        console.log(req.params)
        if(!userId) return res.status(401).json({ message: 'User Id is not available'})
        
        const user = await User.findById(userId).populate('friends', 'name email userPhoto')
        if(!user) return res.status(404).json({ message: "User not found"})

        res.status(200).json(user.friends)
        
    } catch (error) {
        res.status(500).json({ error : error?.message || 'Unable to fetch' })
    }
}