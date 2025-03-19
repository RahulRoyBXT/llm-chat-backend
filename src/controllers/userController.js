// const catchAsync = require('../utils/catchAsync');
// const {promisify} = require('util');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const speakeasy = require("speakeasy")
const QRCode = require('qrcode')

const User = require('../models/userModel');
const {generateAccessToken} = require('../utils/generateToken');
const isAdmin = require('../middleware/adminMiddleware');



// Verifying if teh user is Logged in

const checkAuth = (req, res) => {
    console.log('Cookie: ',req.cookies)
    const token = req.cookies?.token || null;

    if(!token){
        return res.status(401).json({ message: "Not authenticated"})
    }
    console.log('secret: ', process.env.JWT_SECRET)
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded.id)
        res.json({message: 'Authenticated', user: decoded})
    } catch (error) {
        res.status(403).json({ message: ' Invalid Token'})
    }
}

// User Profile

const fetchProfile = (req, res) => {
    if(!req.user) return res.status(401).json({ message: 'User is Not Available'})
    const {name, email, userPhoto } = req.user
    res.json({name: name, email: email, photo: userPhoto})
}

// Enable 2FA

const enable2FA = async (req, res)=> {
    const {userId} = req.body

    const secret = speakeasy.generateSecret({length: 20})

    await User.findByIdAndUpdate(userId, {twoFactorAuth: secret.base32})

    const otpAuthUrl = secret.otpauth_url;
    const qrCodeImage = await QRCode.toDataURL(otpAuthUrl);
    console.log('Secret Check: %d',secret.base32)
    res.json({ secret: secret.base32, qrCodeImage });
}

// Verify 2FA

const verify2FA = async (req, res)=> {
    const {userId, token} = req.body

    const user = await User.findById(userId)

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorAuth,
        encoding: 'base32',
        token,
    })

    if(verified){
        res.json({message: 'OTP verified'})
    } else {
        res.status(401).json({message: 'Invalid OTP'})
    }
}

// See All user [Should be Admin Previllage]

const getAllUsers = async (req, res)=> {

    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch(err){
        res.status(400).json({message: err.message})
    }
}


// Create User

const createUser = async (req, res) => {
    console.log('hello')
    try {
        const { userName: name, email, password } = req.body;
        console.log(name, email, password)
        const userPhoto = req.file? req.file.buffer.toString("base64"): null;
        // console.log(name, email, password, userPhoto)
        if (!name || !email || !password || !userPhoto) {
            console.log('Missing fields');
            return res.status(400).json({ message: "Please provide all fields" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('user exist')
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({ name, email, password: hashedPassword, userPhoto });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                // userPhoto: user.userPhoto,
                isAdmin: user.isAdmin,
                friends: user.friends,
                token: generateAccessToken(user)
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Login user

const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body

        // Checking User in the DB
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message: 'Invalid email or password'})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"})
        }

        // Generate jwt Token
        const token = generateAccessToken(user);

        // Set HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production", // Only Secure in Production
            sameSite: process.env.NODE_ENV === "production"? 'Strict': 'Lax',
            maxAge: 15*60*1000, // 15 minutes
        })

        // res.cookie('user', 'JohnDoe', {
        //     maxAge: 3600000,  // 1 hour
        //     httpOnly: false,  // Accessible by JavaScript
        //     secure: false,    // For local development (use true in production)
        //     sameSite: 'Lax'   // Adjust for your use case
        //   });
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.role === 'admin',
            token,
        })
    } catch (error){
        res.status(500).json({error: 'server error'})
    }
}

// Logout User

const logoutUser = (req, res) => {
    console.log(req.cookies)
        if (!req.cookies?.token) {
            return res.status(401).json({ message: 'You are Not logged in!' });
        }

    res.clearCookie('token', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });

    res.json({ message: 'Logged out successfully' });
};



module.exports = {getAllUsers, createUser, loginUser, logoutUser,checkAuth,fetchProfile, verify2FA, enable2FA};