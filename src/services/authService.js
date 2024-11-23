const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async ({ first_name, last_name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({first_name, last_name, email, password: hashedPassword});
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100h' });
    return { token, userId: user.id };
};

module.exports = {
    registerUser,
    loginUser,
};