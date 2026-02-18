const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
// IMPORT RESUME MODEL
const { Resume } = require('../models');

// Login route
router.get('/', (req, res) => {
    res.render('login', { errorMsg: null });
});

router.get('/login', (req, res) => {
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

// DASHBOARD ROUTE
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        // Fetch all resumes belonging to this user
        const resumes = await Resume.findAll({ 
            where: { userId: req.user.id },
            order: [['updatedAt', 'DESC']] // Show newest first
        });

        res.render('dashboard', { 
            User: req.user, 
            resumes: resumes 
        });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.render('dashboard', { User: req.user, resumes: [] });
    }
});

module.exports = router;