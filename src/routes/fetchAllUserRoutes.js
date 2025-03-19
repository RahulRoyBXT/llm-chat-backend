const express = require('express')

const {getAllUsersExceptLoggedIn} = require('../controllers/allUserController.js')

const router = express.Router()

router.get('/getalluser', getAllUsersExceptLoggedIn)

module.exports = router