const express = require("express");

const router = express.Router();

// In-memory database
let playlists = [
    {
        id: 1,
        name: "Workout Mix",
        songs: 20
    },
    {
        id: 2,
        name: "Chill Vibes",
        songs: 15
    },
    {
        id: 3,
        name: "Party Hits",
        songs: 30
    }
];

// Fake database delay
const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

// ==========================================
// Task 1
// GET All Playlists
// ==========================================

router.get("/", (req, res) => {
    res.status(200).json(playlists);
});

// ==========================================
// Task 2 & Task 5
// PUT Update Playlist
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        await delay(1000);

        const id = Number(req.params.id);

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Playlist name is required"
            });
        }

        const playlist = playlists.find(
            p => p.id === id
        );

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist Not Found"
            });
        }

        playlist.name = name;

        res.status(200).json({
            message: "Playlist Updated Successfully",
            playlist
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ==========================================
// Task 3
// DELETE Playlist
// ==========================================

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = playlists.findIndex(
        p => p.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Playlist Not Found"
        });

    }

    playlists.splice(index, 1);

    res.status(200).json({
        message: "Playlist Deleted Successfully"
    });

});

router.put("/:id", async (req, res) => {

    try {

        await delay(1000);

        const id = Number(req.params.id);

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Playlist name is required"
            });
        }

        const playlist = playlists.find(
            p => p.id === id
        );

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist Not Found"
            });
        }

        playlist.name = name;

        res.status(200).json({
            message: "Playlist Updated Successfully",
            playlist
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });

    }

});

module.exports = router;