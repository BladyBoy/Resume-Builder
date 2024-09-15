const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const User = require('../models/userModel');

// Login route
router.get('/', (req, res) => {
    res.render('login', { errorMsg: null });
});

router.post('/login', userController.login);

// Signup route
router.get('/signup', (req, res) => {
    res.render('signup', { errorMsg: null });
});

router.post('/signup', userController.signup);

// Logout route
router.get('/logout', userController.logout);

// Dashboard route 
router.get('/dashboard', isAuthenticated, (req, res) => {
    const user = req.user
    res.render('dashboard', {User: user});
});

module.exports = router;
