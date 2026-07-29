const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey123";

const verifyToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                message: "Authorization token required"

            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;

        next();

    }

    catch (error) {

        if (error.name === "TokenExpiredError") {

            return res.status(401).json({

                message: "Session expired, please login again"

            });

        }

        return res.status(401).json({

            message: "Invalid Token"

        });

    }

};

module.exports = verifyToken;