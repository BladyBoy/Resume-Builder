const { User } = require('../models');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Duplicate email handling
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.render('signup', { errorMsg: 'Email already in use. Please try using another Email.' });
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating user record
        const newUser = await User.create({ username, email, password: hashedPassword });

        req.login(newUser, (err) => {
            if (err) {
                console.error('Auto-login error:', err);
                return next(err);
            }
            return res.redirect('/dashboard');
        });

    } catch (error) {
        console.error('Signup Error:', error);
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
            return res.render('login', { errorMsg: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in:', err);
                return next(err);
            }
            // Explicitly save session before redirecting
            req.session.save(() => {
                res.redirect('/dashboard');
            });
        });
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
};