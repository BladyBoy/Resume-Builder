const sequelize = require('../config/db');
const User = require('./userModel');
const Resume = require('./resumeModel');


// A User can have multiple Resumes (Scaling for the future!)
User.hasMany(Resume, { 
    foreignKey: 'userId', 
    onDelete: 'CASCADE' // If User is deleted, delete their resumes too
});

// A Resume belongs to one User
Resume.belongsTo(User, { 
    foreignKey: 'userId' 
});

// Export the "Packed" Database Object
module.exports = {
    sequelize,
    User,
    Resume
};