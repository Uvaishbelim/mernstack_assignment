const jwt = require("jsonwebtoken");

const SECRET_KEY = "mySecretKey";

const login = (req, res) => {

    const { email, password } = req.body;

    // Dummy login
    if (
        email !== "admin@gmail.com" ||
        password !== "123456"
    ) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const token = jwt.sign(
        {
            email
        },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    res.status(200).json({
        success: true,
        token
    });

};

module.exports = {
    login
};