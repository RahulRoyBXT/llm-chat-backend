const mongoose = require("mongoose");
const FriendRequest = require("../models/friendRequestModel.js");
const User = require("../models/userModel.js");

// Send Friend Request

exports.sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (!senderId || !receiverId)
      return res
        .status(401)
        .json({ message: "senderId or receiverId is not available" });
    if (senderId === receiverId)
      return res
        .status(400)
        .json({ message: "You can't request to yourself." });

    const getUser = await User.findById(senderId);
    const alreadyFriends = new Set(
      getUser.friends.map((friend) => friend.toString())
    ).has(receiverId);
    if (alreadyFriends) {
      res.status(400).json({ message: "Already Friends" });
    }

    // Checking if request already exist
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (existingRequest)
      return res.status(400).json({ message: " Friend Request Already Sent." });
    console.log("Not created");
    const newRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json({ message: newRequest });
  } catch (error) {
    console.log("hello");
    res.status(500).json({ error: error.message });
  }
};

// Accept Friend Request
exports.acceptFriedRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    if (!requestId)
      return res.status(401).json({ message: "requestId is not available" });

    const request = await FriendRequest.findById(requestId);
    if (!request)
      return res.status(404).json({ message: "Request is not Found" });

    await request.save();

    // Delete After Accept it
    await FriendRequest.findOneAndDelete(requestId);

    // Add each other as friends
    await User.findByIdAndUpdate(request.sender, {
      $push: { friends: request.receiver },
    });
    await User.findByIdAndUpdate(request.receiver, {
      $push: { friends: request.sender },
    });

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject Friend Request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    if (!requestId)
      return res.status(401).json({ message: "requestId is not available " });
    const request = await FriendRequest.findById(requestId);
    if (!request)
      return res.status(404).json({ message: "Request is not found" });

    if (request.status === "rejected") {
      return res.status(400).json({ message: "Already Rejected" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Friend List

exports.getFriendList = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(req.params);
    if (!userId)
      return res.status(401).json({ message: "User Id is not available" });

    const user = await User.findById(userId).populate(
      "friends",
      "name email userPhoto"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Unable to fetch" });
  }
};

// Pending request
exports.getPendingRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID is required", 
        error: "MISSING_USER_ID" 
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid user ID format", 
        error: "INVALID_USER_ID_FORMAT" 
      });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ 
        success: false,
        message: "User not found", 
        error: "USER_NOT_FOUND" 
      });
    }

    // Find all requests where the user is the sender and status is pending
    const pendingRequests = await FriendRequest.find({
      sender: userId,
      status: 'pending'
    }).populate('receiver', 'name email userPhoto');

    return res.status(200).json({
      success: true,
      count: pendingRequests.length,
      data: pendingRequests
    });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch pending friend requests",
      error: error?.message || "Internal server error"
    });
  }
};

// Received Request
exports.getReceivedRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID is required", 
        error: "MISSING_USER_ID" 
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid user ID format", 
        error: "INVALID_USER_ID_FORMAT" 
      });
    }
    
    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ 
        success: false,
        message: "User not found", 
        error: "USER_NOT_FOUND" 
      });
    }

    // Find all requests where the user is the receiver and status is pending
    const receivedRequests = await FriendRequest.find({
      receiver: userId,
      status: 'pending'
    }).populate('sender', 'name email userPhoto');

    return res.status(200).json({
      success: true,
      count: receivedRequests.length,
      data: receivedRequests
    });
  } catch (error) {
    console.error("Error fetching received requests:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch received friend requests",
      error: error?.message || "Internal server error"
    });
  }
};

// Delete Friends
exports.removeFriends = async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.user._id.toString();

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { friends: friendId },
      }
    );
    await User.findByIdAndUpdate(
        friendId,
        {
          $pull: { friends: userId },
        }
      );

    return res.status(200).json({ message: "Friend removed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cancel Friend Request
exports.cancelFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    
    if (!requestId) {
      return res.status(400).json({ 
        success: false,
        message: "Request ID is required", 
        error: "MISSING_REQUEST_ID" 
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid request ID format", 
        error: "INVALID_REQUEST_ID_FORMAT" 
      });
    }

    // Find the request
    const request = await FriendRequest.findById(requestId);
    
    // Check if the request exists
    if (!request) {
      return res.status(404).json({ 
        success: false,
        message: "Friend request not found", 
        error: "REQUEST_NOT_FOUND" 
      });
    }
    
    // Only pending requests can be canceled
    if (request.status !== "pending") {
      return res.status(400).json({ 
        success: false,
        message: "Only pending friend requests can be canceled", 
        error: "INVALID_REQUEST_STATUS" 
      });
    }
    
    // Delete the friend request
    await FriendRequest.findByIdAndDelete(requestId);

    return res.status(200).json({
      success: true,
      message: "Friend request canceled successfully"
    });
  } catch (error) {
    console.error("Error canceling friend request:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to cancel friend request",
      error: error?.message || "Internal server error"
    });
  }
};

