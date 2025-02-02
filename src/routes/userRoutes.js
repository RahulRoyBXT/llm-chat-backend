const express = require('express');
const {getAllUsers, createUser, loginUser} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/getusers', getAllUsers);
router.post('/createuser', createUser);
router.post('/loginuser', loginUser);

router.get('/profile', protect, (req, res)=>{
    console.log(req)
    res.send(req.user)
})

router.get('/admin', protect, isAdmin, (req, res)=>{
    res.json({message: 'Welcome, Admin Sama!'})
})

module.exports = router;