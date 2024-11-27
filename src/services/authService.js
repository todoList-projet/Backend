const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const JWT_SECRET = process.env.JWT_SECRET; // Ensure this line is correct
dotenv.config();


// Générer un token JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '12h' }
    );
};

// Vérifier le token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // Si le token est invalide ou expiré
    }
};

const registerUser = async (first_name, last_name, email, password) => {
    try {
        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        return newUser;
    } catch (error) {
        throw error;
    }
};


const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Générer un token JWT
        const token = generateToken(user);

        return { user, token };
    } catch (error) {
        throw error;
    }
};



//
// const registerUser = async ({ first_name, last_name, email, password }) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     return await User.create({first_name, last_name, email, password: hashedPassword});
// };

// const loginUser = async ({ email, password }) => {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//         throw new Error('Invalid email or password');
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         throw new Error('Invalid email or password');
//     }
//     const payload = { id: user.id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100h' });
//     return { token, userId: user.id };
// };

module.exports = {
    generateToken, verifyToken,
    registerUser,
    loginUser,
};