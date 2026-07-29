const express = require("express");

const app = express();

app.use(express.json());

// Import Routes
const playlistRoutes = require("./routes/playlistRoutes");
const userRoutes = require("./routes/userRoutes");

// Mount Routes
app.use("/playlists", playlistRoutes);
app.use("/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Playlist API");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});