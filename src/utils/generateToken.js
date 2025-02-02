const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const generateToken = (id) => {
    return jwt.sign({id: userModel._id, rol: userModel.role}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = generateToken