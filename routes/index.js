const express = require('express');
const userRoutes = require('./userRoutes');
const groupRoutes = require('./groupRoutes');
const taskRoutes = require('./taskRoutes');

const router = express.Router();

// Users routes
router.use('/users', userRoutes);
// Groups routes
router.use('/groups', groupRoutes);
// Tasks routes
router.use('/tasks', taskRoutes);

module.exports = router;