const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../Model/Users');
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const authMiddleware = require('../middleware/autorization');


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://HerbillonMia:68Nr575aB7iSJnxd@herbillonmia.vsxvity.mongodb.net/OuiNon');

// Récupérer tous les IDs des utilisateurs
router.get('/allId', async (req, res) => {
    try {
        const users = await User.find();
        const userIds = users.map(user => user.id);
        res.status(200).json(userIds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user IDs' });
    }
});

//Récuperer l'user
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur' });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "This email already has an account" });
        }
        if (!email || !password) {
            return res.status(400).json({ message: "Missing parameters" });
        }
        const token = uid2(10);
        const salt = uid2(10);

        const hash = SHA256(password + salt).toString(encBase64);

        const newUser = new User({
            email,
            token,
            hash,
            salt,


        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            token: newUser.token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
