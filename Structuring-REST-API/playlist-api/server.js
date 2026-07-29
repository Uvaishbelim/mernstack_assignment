const express = require("express");

const app = express();

app.use(express.json());

// =========================================
// In-Memory Database
// =========================================

let playlists = [];

// =========================================
// Task 1
// POST /playlist
// Create Playlist
// =========================================

app.post("/playlist", (req, res) => {

    const { name, songs } = req.body;

    const newPlaylist = {
        id: playlists.length + 1,
        name,
        songs
    };

    // Promise to simulate database insert
    Promise.resolve(newPlaylist)

        .then((playlist) => {

            playlists.push(playlist);

            return playlists;

        })

        .then((updatedPlaylists) => {

            // Task 4
            // Return Updated Playlist List

            res.status(201).json({

                message: "Playlist Created Successfully",

                createdPlaylist: newPlaylist,

                allPlaylists: updatedPlaylists

            });

        })

        .catch((error) => {

            res.status(500).json({

                message: error.message

            });

        });

});

// =========================================
// Task 2
// GET Playlist By ID
// =========================================

app.get("/playlist/:id", (req, res) => {

    const id = Number(req.params.id);

    const playlist = playlists.find(

        p => p.id === id

    );

    if (!playlist) {

        return res.status(404).json({

            message: "Playlist Not Found"

        });

    }

    res.status(200).json(playlist);

});

// =========================================
// Task 3
// GET All Playlists
// Only Name & Total Songs
// =========================================

app.get("/playlists", (req, res) => {

    const result = playlists.map((playlist) => {

        return {

            id: playlist.id,

            name: playlist.name,

            totalSongs: playlist.songs.length

        };

    });

    res.status(200).json(result);

});

// =========================================
// Task 4
// Promise Chaining Used
// Only Name & Total Songs
// =========================================

Promise.resolve(newPlaylist)

    .then((playlist) => {

        playlists.push(playlist);

        return playlists;

    })

    .then((updatedPlaylists) => {

        res.status(201).json({

            message: "Playlist Created Successfully",

            createdPlaylist: newPlaylist,

            allPlaylists: updatedPlaylists

        });

    })

    .catch((error) => {

        res.status(500).json({

            message: error.message

        });

    });

// =========================================
// Server
// =========================================

app.listen(5000, () => {

    console.log("Server Running On Port 5000");

});