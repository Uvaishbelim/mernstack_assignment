const jwt = require("jsonwebtoken");

const SECRET = "secretKey";

module.exports = (req, res, next) => {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            message: "Token Missing"
        });
    }

    const token = header.split(" ")[1];

    try {

        req.user = jwt.verify(token, SECRET);

        next();

    } catch {

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }

};