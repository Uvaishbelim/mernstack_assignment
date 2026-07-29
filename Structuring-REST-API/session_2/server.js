const express = require("express");

const connectDB = require("./config/db");

const PlaylistCategory = require("./models/PlaylistCategory");

const Song = require("./models/Song");

const app = express();

connectDB();

app.use(express.json());


// =========================================
// POST /categories
// Add Category
// =========================================

app.post("/categories", async (req, res) => {

    try {

        const category = await PlaylistCategory.create({

            name: req.body.name,

            description: req.body.description

        });

        res.status(201).json(category);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================================
// GET /categories
// Get All Categories
// =========================================

app.get("/categories", async (req, res) => {

    try {

        const categories = await PlaylistCategory.find();

        res.json(categories);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// =========================================
// DELETE /categories/:id
// Delete Category
// =========================================

app.delete("/categories/:id", async (req, res) => {

    try {

        const category = await PlaylistCategory.findByIdAndDelete(

            req.params.id

        );

        if (!category) {

            return res.status(404).json({

                message: "Category Not Found"

            });

        }

        res.json({

            message: "Category Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// =========================================
// POST /songs
// Add Song
// =========================================

app.post("/songs", async (req, res) => {

    try {

        const song = await Song.create({

            title: req.body.title,

            artist: req.body.artist,

            category: req.body.category

        });

        res.status(201).json(song);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// =========================================
// GET /songs?category=id
// Get Songs By Category
// =========================================

app.get("/songs", async (req, res) => {

    try {

        const filter = {};

        if (req.query.category) {

            filter.category = req.query.category;

        }

        const songs = await Song.find(filter)

            .populate("category", "name");

        res.json(songs);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


app.listen(3000, () => {

    console.log("Server Running On Port 3000");

});