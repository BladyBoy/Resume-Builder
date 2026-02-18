const express = require('express');
const router = express.Router();
const { Resume } = require('../models'); 
const isAuthenticated = require('../middlewares/isAuthenticated');

router.use(isAuthenticated);

// CREATE NEW (Renders blank form)
router.get('/create', (req, res) => {
    res.render('resumeEditor', { resume: null });
});

// EDIT EXISTING (Renders form with data)
router.get('/edit/:id', async (req, res) => {
    try {
        const resume = await Resume.findOne({ 
            where: { 
                id: req.params.id, 
                userId: req.user.id 
            } 
        });

        if (!resume) {
            return res.redirect('/dashboard');
        }
        
        res.render('resumeEditor', { resume: resume });
    } catch (error) {
        console.error(error);
        res.redirect('/dashboard');
    }
});

// HANDLE SUBMIT (Create or Update)
router.post('/submit', async (req, res) => {
    try {
        const { id, ...formData } = req.body; 
        
        if (!formData.dob || formData.dob.trim() === '' || formData.dob === 'Invalid date') {
            formData.dob = null;
        }

        const data = { ...formData, userId: req.user.id };

        if (id && id.trim() !== '') {
            const resume = await Resume.findOne({ where: { id: id, userId: req.user.id } });
            if (resume) {
                await resume.update(data);
                return res.redirect(`/resume/view/${resume.id}`);
            }
        } 
        
        // --- CREATE NEW ---
        const newResume = await Resume.create(data);
        res.redirect(`/resume/view/${newResume.id}`);

    } catch (error) {
        console.error("❌ Submit Error:", error);
        res.status(500).send('Internal Server Error: ' + error.message);
    }
});

// VIEW RESUME
router.get('/view/:id', async (req, res) => {
    try {
        const resume = await Resume.findOne({ 
            where: { 
                id: req.params.id, 
                userId: req.user.id 
            } 
        });

        if (!resume) return res.redirect('/dashboard');
        
        res.render('displayResume', { resume });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE RESUME
router.post('/delete/:id', async (req, res) => {
    try {
        const resume = await Resume.findOne({ 
            where: { 
                id: req.params.id, 
                userId: req.user.id 
            } 
        });

        if (resume) {
            await resume.destroy();
            console.log(`✅ Resume ID ${req.params.id} deleted successfully.`);
        }

        res.redirect('/dashboard');
    } catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;