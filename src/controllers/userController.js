// const catchAsync = require('../utils/catchAsync');
// const {promisify} = require('util');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const getAllUsers = async (req, res)=> {

    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

const createUser = async (req, res)=> {
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: "Please provide all fields"})
        }

        // Check if user already exists
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({error: "User already exists"})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({name, email, password})

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
           res.status(400).json({message: "Invalid user data"})
        }

    } catch(err){
        res.status(400).json({message: err.message})
    }
}


// Login user

const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {        
            res.status(401).json({message: "Invalid email or password"})
        }
    } catch (error){
        res.status(500).json({error: 'server error'})
    }
}

module.exports = {getAllUsers, createUser, loginUser};