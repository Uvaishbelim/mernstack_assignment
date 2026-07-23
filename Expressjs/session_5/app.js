const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory data
const tracks = [
    {
        id: 1,
        name: "Believer",
        artist: "Imagine Dragons"
    },
    {
        id: 2,
        name: "Shape of You",
        artist: "Ed Sheeran"
    },
    {
        id: 3,
        name: "Blinding Lights",
        artist: "The Weeknd"
    }
];

// GET all tracks
app.get("/tracks", (req, res) => {
    res.status(200).json(tracks);
});

// POST new track
app.post("/tracks", (req, res) => {

    const { name, artist } = req.body;

    if (!name || !artist) {
        return res.status(400).json({
            message: "Both name and artist are required."
        });
    }

    const newTrack = {
        id: tracks.length + 1,
        name,
        artist
    };

    tracks.push(newTrack);

    res.status(201).json(newTrack);

});

// DELETE track
app.delete("/tracks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tracks.findIndex(track => track.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Track not found"
        });
    }

    tracks.splice(index, 1);

    res.sendStatus(204);

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});