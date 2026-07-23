const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

// Built-in Middleware
app.use(express.json());

// Parse URL Encoded Data
app.use(bodyParser.urlencoded({ extended: true }));

// Request Time Middleware
function requestTime(req, res, next) {
    req.requestTime = new Date().toLocaleString();
    next();
}

// Logger Middleware
function instaLogger(req, res, next) {

    if (req.originalUrl === "/health") {
        return next();
    }

    res.on("finish", () => {
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    });

    next();
}

app.use(requestTime);
app.use(instaLogger);

// Feedback Route
app.post("/feedback", (req, res) => {

    console.log(req.body);

    res.send("Feedback received successfully.");
});

// Time Check Route
app.get("/time-check", (req, res) => {

    res.send(`Request Time: ${req.requestTime}`);

});

// Playlist Route
app.post("/playlist", (req, res) => {

    const { song, artist } = req.body;

    res.send(`Song "${song}" by ${artist} added to your playlist successfully.`);
});

// Health Route
app.get("/health", (req, res) => {

    res.send("OK");

});

// Home Route
app.get("/", (req, res) => {

    res.send("Home Page");

});

// Profile Route
app.get("/profile", (req, res) => {

    res.send("Instagram Profile");

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});