const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Resume extends Model {}

Resume.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tagline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    programming_languages: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tools: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    frameworks: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    technologies: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    otherSkills: {
        type: DataTypes.TEXT,
        allowNull: true  
    },
    degree_institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree_course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree_branch: {
        type: DataTypes.STRING,
        allowNull: true  
    },
    degree_year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree_percentage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    intermediate_institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    intermediate_course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    intermediate_year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    intermediate_percentage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ssc_school: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ssc_year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ssc_percentage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    languages_known: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    technologies_used: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project_tech: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    project_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    achievements: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    certifications: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    links: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Resume'
});

module.exports = Resume;
