const jwt = require("jsonwebtoken");

const SECRET = "secretKey";

let users = [];

exports.register = (req, res) => {

    const { name, email, password } = req.body;

    users.push({
        id: users.length + 1,
        name,
        email,
        password
    });

    res.status(201).json({
        message: "User Registered Successfully"
    });

};

exports.login = (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        token
    });

};