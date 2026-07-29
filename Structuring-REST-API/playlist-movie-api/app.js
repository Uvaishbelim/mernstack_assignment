const express = require("express");

const app = express();

app.use(express.json());

// ==========================================
// In-Memory Database
// ==========================================

let playlists = [];

let movies = [];

// ==========================================
// Task 1
// POST /api/playlist
// ==========================================

app.post("/api/playlist", (req, res) => {

    const { name, description } = req.body;

    if (!name || !description) {

        return res.status(400).json({

            success: false,

            message: "Name and description are required."

        });

    }

    const playlist = {

        id: playlists.length + 1,

        name,

        description

    };

    playlists.push(playlist);

    res.status(201).json({

        success: true,

        message: "Playlist created successfully.",

        playlist

    });

});

// ==========================================
// Task 2
// POST /api/movie
// ==========================================

app.post("/api/movie", (req, res) => {

    const { title, genre, releaseYear } = req.body;

    if (!title || !genre || releaseYear === undefined) {

        return res.status(400).json({

            success: false,

            message: "All fields are required."

        });

    }

    if (title.trim().length < 2) {

        return res.status(400).json({

            success: false,

            message: "Title must be at least 2 characters long."

        });

    }

    if (isNaN(releaseYear)) {

        return res.status(400).json({

            success: false,

            message: "Release year must be a number."

        });

    }

    const movie = {

        id: movies.length + 1,

        title,

        genre,

        releaseYear: Number(releaseYear)

    };

    movies.push(movie);

    res.status(201).json({

        success: true,

        message: "Movie added successfully.",

        movie

    });

});

// ==========================================
// Task 3
// PUT /api/playlist/:id
// ==========================================

app.put("/api/playlist/:id", (req, res) => {

    const id = Number(req.params.id);

    const { name, description } = req.body;

    const playlist = playlists.find(

        p => p.id === id

    );

    if (!playlist) {

        return res.status(404).json({

            success: false,

            message: "Playlist not found"

        });

    }

    if (!name || !description) {

        return res.status(400).json({

            success: false,

            message: "Name and description are required."

        });

    }

    playlist.name = name;

    playlist.description = description;

    res.status(200).json({

        success: true,

        message: "Playlist updated successfully.",

        playlist

    });

});

// ==========================================
// Task 4
// PUT /api/movie/:id
// ==========================================

app.put("/api/movie/:id", (req, res) => {

    const id = Number(req.params.id);

    const { genre, releaseYear } = req.body;

    const movie = movies.find(

        m => m.id === id

    );

    if (!movie) {

        return res.status(404).json({

            success: false,

            message: "Movie not found."

        });

    }

    const allowedGenres = [

        "Action",

        "Drama",

        "Comedy",

        "Thriller"

    ];

    if (!allowedGenres.includes(genre)) {

        return res.status(400).json({

            success: false,

            message: "Genre must be Action, Drama, Comedy, or Thriller."

        });

    }

    if (isNaN(releaseYear)) {

        return res.status(400).json({

            success: false,

            message: "Release year must be a number."

        });

    }

    movie.genre = genre;

    movie.releaseYear = Number(releaseYear);

    res.status(200).json({

        success: true,

        message: "Movie updated successfully.",

        movie

    });

});

// ==========================================
// Server
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});