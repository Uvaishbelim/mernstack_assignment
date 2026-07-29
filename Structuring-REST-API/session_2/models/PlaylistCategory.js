const mongoose = require("mongoose");

const playlistCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    }

});

module.exports = mongoose.model(
    "PlaylistCategory",
    playlistCategorySchema
);