const express = require("express");

const app = express();

app.use(express.json());

// ==========================================
// In-Memory Database
// ==========================================

let playlists = [
    {
        id: 1,
        name: "Workout Playlist"
    },
    {
        id: 2,
        name: "Chill Playlist"
    }
];

let restaurants = [
    {
        id: 1,
        name: "Pizza Hut",
        location: "Ahmedabad"
    },
    {
        id: 2,
        name: "Domino's",
        location: "Surat"
    }
];

let cart = [
    {
        id: 101,
        product: "Laptop"
    },
    {
        id: 102,
        product: "Mouse"
    }
];

let movies = [
    {
        id: 1,
        title: "Avengers",
        genre: "Action"
    },
    {
        id: 2,
        title: "Interstellar",
        genre: "Sci-Fi"
    }
];

let users = [
    {
        id: 1,
        name: "Rahul"
    },
    {
        id: 2,
        name: "Priya"
    }
];

// ==========================================
// Task 1
// DELETE Playlist
// ==========================================

app.delete("/playlists/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = playlists.findIndex(
        playlist => playlist.id === id
    );

    if (index === -1) {

        return res.status(404).json({

            success: false,

            message: "Playlist not found"

        });

    }

    playlists.splice(index, 1);

    res.status(200).json({

        success: true,

        message: "Playlist deleted successfully"

    });

});

// ==========================================
// Task 2
// GET Restaurants
// ==========================================

app.get("/restaurants", async (req, res) => {

    try {

        // Simulate database query

        const data = restaurants;

        res.status(200).json(data);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Database connection failed"

        });

    }

});

// ==========================================
// Task 3
// DELETE Product From Cart
// ==========================================

app.delete("/cart/:productId", (req, res) => {

    const productId = Number(req.params.productId);

    const index = cart.findIndex(
        product => product.id === productId
    );

    if (index === -1) {

        return res.status(404).json({

            success: false,

            message: "Product not found"

        });

    }

    cart.splice(index, 1);

    res.status(200).json({

        success: true,

        message: "Product removed from cart"

    });

});

// ==========================================
// Task 4
// GET Movie By ID
// ==========================================

app.get("/movies/:id", (req, res) => {

    const id = Number(req.params.id);

    const movie = movies.find(
        movie => movie.id === id
    );

    if (!movie) {

        return res.status(404).json({

            success: false,

            message: "Movie not found"

        });

    }

    res.status(200).json(movie);

});

// ==========================================
// Task 5
// DELETE User
// ==========================================

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex(
        user => user.id === id
    );

    if (index === -1) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }

    users.splice(index, 1);

    res.status(200).json({

        success: true,

        message: "User deleted successfully"

    });

});

// ==========================================
// Server
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});