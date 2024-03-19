// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login route
router.post('/api/auth/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/api/auth/signin' }));

// Logout route
router.get('/api/auth/signup', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Register route
router.post('/api/auth/signup', (req, res) => {
    // Registration logic
});

module.exports = router;