const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const User = require('../models/userModel'); 

module.exports = (app) => {
    // Session configuration
    app.use(session({
        secret: process.env.SESSION_SECRET || 'secret_key', 
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.NODE_ENV === 'production' } 
    }));

    // Initialize passport for authentication
    app.use(passport.initialize());
    app.use(passport.session());

    // Passport Local Strategy for authentication using username and password
    passport.use(new LocalStrategy({
        usernameField: 'usernameOrEmail',
        passwordField: 'password'
    }, async (usernameOrEmail, password, done) => {
        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
                }
            });
            if (!user) {
                return done(null, false, { message: 'Incorrect username or email.' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    // Serializing user to the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserializing user from the session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
