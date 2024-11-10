const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 3006;

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        sequelize.sync({ alter: false });
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});