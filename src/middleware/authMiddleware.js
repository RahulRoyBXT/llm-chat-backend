const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    // console.log('Middleware')
    const token = req.cookies?.token;
    // console.log('token: ', token)
    if(!token) return res.status(401).json({message: 'Token is Not Available or Expired'})
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password'); // Attach user
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
};

module.exports = protect;