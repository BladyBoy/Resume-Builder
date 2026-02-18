const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Resume extends Model {}

Resume.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
    },
    templateId: { type: DataTypes.STRING, defaultValue: 'template1', allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    tagline: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    
    // Skills (Stored as JSON Strings)
    programming_languages: { type: DataTypes.TEXT, allowNull: true },
    tools: { type: DataTypes.TEXT, allowNull: true },
    frameworks: { type: DataTypes.TEXT, allowNull: true },
    technologies: { type: DataTypes.TEXT, allowNull: true },
    otherSkills: { type: DataTypes.TEXT, allowNull: true },
    
    // Education
    degree_institute: { type: DataTypes.STRING, allowNull: false },
    degree_course: { type: DataTypes.STRING, allowNull: false },
    degree_branch: { type: DataTypes.STRING, allowNull: true },
    degree_year: { type: DataTypes.STRING, allowNull: false },
    degree_percentage: { type: DataTypes.STRING, allowNull: false },
    
    intermediate_institute: { type: DataTypes.STRING, allowNull: true },
    intermediate_course: { type: DataTypes.STRING, allowNull: true },
    intermediate_year: { type: DataTypes.STRING, allowNull: true },
    intermediate_percentage: { type: DataTypes.STRING, allowNull: true },
    
    ssc_school: { type: DataTypes.STRING, allowNull: true },
    ssc_year: { type: DataTypes.STRING, allowNull: true },
    ssc_percentage: { type: DataTypes.STRING, allowNull: true },
    
    languages_known: { type: DataTypes.TEXT, allowNull: true },
    
    // Experience 1
    company_name: { type: DataTypes.STRING, allowNull: true },
    position: { type: DataTypes.STRING, allowNull: true },
    duration: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    technologies_used: { type: DataTypes.TEXT, allowNull: true },

    // Experience 2
    company2_name: { type: DataTypes.STRING, allowNull: true },
    position2: { type: DataTypes.STRING, allowNull: true },
    duration2: { type: DataTypes.STRING, allowNull: true },
    location2: { type: DataTypes.STRING, allowNull: true },
    technologies_used2: { type: DataTypes.TEXT, allowNull: true },
    
    // Projects
    project_name: { type: DataTypes.STRING, allowNull: true },
    project_tech: { type: DataTypes.TEXT, allowNull: true },
    project_description: { type: DataTypes.TEXT, allowNull: true },

    project2_name: { type: DataTypes.STRING, allowNull: true },
    project2_tech: { type: DataTypes.TEXT, allowNull: true },
    project2_description: { type: DataTypes.TEXT, allowNull: true },
    
    achievements: { type: DataTypes.TEXT, allowNull: true },
    certifications: { type: DataTypes.TEXT, allowNull: true },
    links: { type: DataTypes.TEXT, allowNull: true }
}, {
    sequelize,
    modelName: 'Resume'
});

module.exports = Resume;