const express = require("express");

const router = express.Router();

// Register
router.post("/register", (req, res) => {

    const { name, email } = req.body;

    res.status(201).json({

        message: "User Registered Successfully",

        user: {
            name,
            email
        }

    });

});

// Login
router.post("/login", (req, res) => {

    const { email } = req.body;

    res.status(200).json({

        message: "Login Successful",

        email

    });

});



module.exports = router;