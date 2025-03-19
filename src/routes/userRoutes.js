const express = require('express');
const rateLimit = require('express-rate-limit');

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {getAllUsers, createUser, loginUser, verify2FA, enable2FA, logoutUser, checkAuth, fetchProfile} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

// const loginRateLimit = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5, // limit each IP to 5 requests per windowMs
//     message: 'Too many login attempts, please try again later'
// })


router.get('/auth/getusers', getAllUsers);
router.post('/auth/createuser', upload.single('userPhoto'),createUser);
router.post('/auth/loginuser', loginUser);
router.post('/auth/logoutuser', logoutUser)

// Check Auth

router.post('/auth/checkauth', checkAuth)



// Profile Route

router.post('/auth/profile',protect, fetchProfile)


// Frontend Code

// axios.get("http://localhost:5000/api/users/auth/checkauth", { withCredentials: true })
//     .then(response => console.log("User is authenticated:", response.data))
//     .catch(error => console.log("User not logged in"))


router.get('/profile', protect, (req, res)=>{
    console.log(req)
    res.send(req.user)
})

router.get('/admin', protect, isAdmin, (req, res)=>{
    res.json({message: 'Welcome, Admin Sama!'})
})

router.post('/enable2fa', protect, enable2FA);
router.post('/verify2fa', protect, verify2FA);

module.exports = router;