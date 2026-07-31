const express = require("express");

const app = express();
const PORT = 3000;

// -----------------------------
// Custom Logger Middleware
// -----------------------------
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleString();

    console.log(
        `[${timestamp}] ${req.method} ${req.url}`
    );

    next(); // Pass control to the next middleware/route
};

// Use middleware globally
app.use(logger);

// -----------------------------
// Hardcoded Restaurant Data
// -----------------------------
const restaurants = [
    {
        id: 1,
        name: "Spice Villa",
        cuisine: "Indian"
    },
    {
        id: 2,
        name: "Pizza Palace",
        cuisine: "Italian"
    },
    {
        id: 3,
        name: "Dragon Bowl",
        cuisine: "Chinese"
    },
    {
        id: 4,
        name: "Bombay Bites",
        cuisine: "Indian"
    }
];

// -----------------------------
// GET /restaurants
// Supports:
// /restaurants
// /restaurants?cuisine=Indian
// -----------------------------
app.get("/restaurants", (req, res) => {

    const { cuisine } = req.query;

    if (cuisine) {

        const filteredRestaurants = restaurants.filter(
            (restaurant) =>
                restaurant.cuisine.toLowerCase() === cuisine.toLowerCase()
        );

        return res.status(200).json(filteredRestaurants);
    }

    res.status(200).json(restaurants);
});

// -----------------------------
// GET /restaurants/:id
// -----------------------------
app.get("/restaurants/:id", (req, res) => {

    const id = Number(req.params.id);

    const restaurant = restaurants.find(
        (restaurant) => restaurant.id === id
    );

    if (!restaurant) {
        return res.status(404).json({
            success: false,
            message: "Restaurant not found"
        });
    }

    res.status(200).json(restaurant);
});

// -----------------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});