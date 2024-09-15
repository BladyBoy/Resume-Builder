require('dotenv').config();

const express = require('express');
const path = require('path');
const sequelize = require('./config/db'); 
const resumeRoutes = require('./routes/resumeRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
const setupMiddlewares = require('./middlewares/middleware'); 

const app = express();
const PORT = process.env.PORT || 3000;

// EJS Set up 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Serving  static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Applying middlewares using separate middleware file
setupMiddlewares(app);


app.use('/', authRoutes); // Routes for authentication

app.use('/resume', resumeRoutes); // Routes for resume management

// Syncing the models with the database
sequelize.sync()
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Error syncing database:', err));

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});
