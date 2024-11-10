const express = require('express');
const userRoutes = require('./userRoutes');


const router = express.Router();

// Définir les routes

// Users routes
router.use('/users', userRoutes);

// Tasks routes


module.exports = router;