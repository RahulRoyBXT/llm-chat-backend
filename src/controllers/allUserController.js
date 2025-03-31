const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

exports.getAllUsersExceptLoggedIn = async (req, res) => {
    try{
        const token = req.cookies?.token
        if(!token) return res.status(401).json({ message: 'User is not logged in'})
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        const users = await User.find({ _id: { $ne: userId}}).select('-password')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}