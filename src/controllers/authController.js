const authService = require('../services/authService');

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const newUser = await authService.registerUser({ first_name, last_name, email, password });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, userId } = await authService.loginUser({ email, password });
        res.json({ auth: { token, userId } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    register,
    login,
};