// const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

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
        const user = await User.create({name, email, password})
        res.status(201).json({message: "User created successfully", user})
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports = {getAllUsers, createUser};