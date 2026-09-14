const fs = require("fs");

const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();

    const log = `${timestamp} - ${req.method} - ${req.originalUrl}\n`;

    fs.appendFile("access.log", log, (err) => {
        if (err) {
            console.log("Error writing log:", err);
        }
    });

    next();
};

module.exports = logger;