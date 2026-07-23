const express = require("express");

const router = express.Router();

const {
    getAllPlaylists,
    addPlaylist
} = require("../controllers/playlistController");

router.get("/playlists", getAllPlaylists);

router.post("/playlists", addPlaylist);

module.exports = router;