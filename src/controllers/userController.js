const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Dublicate email handling
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.render('signup', { errorMsg: 'Email already in use. Please Try using another Email' });
        }

        // Hashing  password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating user records
        await User.create({ username, email, password: hashedPassword });

        res.redirect('/dashboard'); // Redirecting to dashboard after successful signup
    } catch (error) {
        res.render('signup', { errorMsg: 'Error creating account. Please try again.' });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Login failed:', info.message);
            return res.render('login', { errorMsg: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in:', err);
                return next(err);
            }
            console.log('Login successful:', user.username);
            res.redirect('/dashboard'); // Redirect to dashboard after successful login
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
        res.redirect('/'); // Redirect to login page after logout
    });
};
