const express = require('express');
const router = express.Router();
const Resume = require('../models/resumeModel');

// Rendering to resume form
router.get('/form', (req, res) => {
    console.log("Resume form route is working successfully"); 
    res.render('resumeForm');
});


// form submission Handling
router.post('/submit', async (req, res) => {
    try {
        const {
            name, tagline, email, phone, dob,
            programming_languages, tools, frameworks, technologies, otherSkills,
            degree_institute, degree_course, degree_branch, degree_year, degree_percentage,
            intermediate_institute, intermediate_course, intermediate_year, intermediate_percentage,
            ssc_school, ssc_year, ssc_percentage,
            languages_known, company_name, position, duration, location, technologies_used,
            project_name, project_tech, project_description, achievements, certifications, links
        } = req.body;

        // Creating new resume entry
        await Resume.create({
            name, tagline, email, phone, dob,
            programming_languages, tools, frameworks, technologies, otherSkills,
            degree_institute, degree_course, degree_branch, degree_year, degree_percentage,
            intermediate_institute, intermediate_course, intermediate_year, intermediate_percentage,
            ssc_school, ssc_year, ssc_percentage,
            languages_known, company_name, position, duration, location, technologies_used,
            project_name, project_tech, project_description, achievements, certifications, links
        });

        // Redirecting to the display resume page after creating the new entry
        res.redirect('/resume/display');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Render resume page with data
router.get('/display', async (req, res) => {
    try {
        // To display the most recently created resume
        const resume = await Resume.findOne({ order: [['createdAt', 'DESC']] });

        if (!resume) {
            return res.status(404).send('No resume found');
        }

        // Render the resume page
        res.render('displayResume', { resume });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
