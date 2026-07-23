const express = require("express");

const app = express();

const PORT = 3000;

// Home Route
app.get("/home", (req, res) => {
    res.send("Welcome to Foodie!");
});

// About Route
app.get("/about", (req, res) => {
    res.send("About Foodie App");
});

// Restaurant route without name
app.get("/restaurant", (req, res) => {
    res.status(400).send("Restaurant name required");
});

//  Restaurant Route
app.get("/restaurant/:name", (req, res) => {
    const restaurantName = req.params.name;

    res.send(`You are viewing ${restaurantName}`);
});

// Search Route
app.get("/search", (req, res) => {
    const searchItem = req.query.q;

    res.send(`Results for: ${searchItem}`);
});

// Movie Details Route
app.get("/movie/:id/details", (req, res) => {

    const movieId = req.params.id;
    const genre = req.query.genre;

    res.json({
        id: movieId,
        genre: genre
    });

});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});