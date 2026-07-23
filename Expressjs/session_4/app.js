const express = require("express");

const app = express();

const playlistRoutes = require("./routes/playlistRoutes");

const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", playlistRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});