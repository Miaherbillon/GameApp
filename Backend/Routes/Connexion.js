const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/Users');


const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");




router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (
                SHA256(req.body.password + user.salt).toString(encBase64) === user.hash
            ) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
