const express = require('express');
const userRoutes = require('./userRoutes');
const groupRoutes = require('./groupRoutes');
const taskRoutes = require('./taskRoutes');
const userGroupRoutes = require('./userGroupRoutes');

const router = express.Router();

// Users routes
router.use('/users', userRoutes);
// Groups routes
router.use('/groups', groupRoutes);
// Tasks routes
router.use('/tasks', taskRoutes);
// User_Group routes
router.use('/assign', userGroupRoutes);

module.exports = router;