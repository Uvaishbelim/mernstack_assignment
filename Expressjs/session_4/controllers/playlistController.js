const playlistModel = require("../models/playlistModel");

const getAllPlaylists = (req, res) => {

    const playlists = playlistModel.getPlaylists();

    res.json(playlists);

};

const addPlaylist = (req, res) => {

    const { name, songs } = req.body;

    const newPlaylist = {
        name,
        songs
    };

    const createdPlaylist = playlistModel.createPlaylist(newPlaylist);

    res.status(201).json(createdPlaylist);

};

module.exports = {
    getAllPlaylists,
    addPlaylist
};