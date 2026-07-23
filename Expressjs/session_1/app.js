const express = require("express");

const app = express();

const PORT = 3000;

// Home
app.get("/", (req, res) => {
    res.send("Welcome to Express!");
});

// Profile
app.get("/profile", (req, res) => {
    res.send("This is your profile page.");
});

// Trending
app.get("/trending", (req, res) => {
    res.send("Trending Now on Insta");
});

// Cart
app.get("/cart", (req, res) => {
    res.send("Your Flipkart Cart is empty.");
});

// 404 Route (Always Keep Last)
app.use((req, res) => {
    res.status(404).send("Oops! Page not found on this app.");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});