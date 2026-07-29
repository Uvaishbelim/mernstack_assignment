const jwt = require("jsonwebtoken");

// Secret Key
const SECRET_KEY = "mysecretkey123";

// Function to Generate JWT
const generateAuthToken = (user) => {

    const token = jwt.sign(

        {
            id: user.id,
            email: user.email
        },

        SECRET_KEY,

        {
            expiresIn: "1h"
        }

    );

    return token;

};

module.exports = generateAuthToken;