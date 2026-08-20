const express = require("express");

const roomRoutes = require("./routes/roomRoutes");

const app = express();


// Middleware
app.use(express.json());


// Homepage
app.get("/", (req, res) => {
    res.send("Welcome to StayEZ");
});


// Room routes
app.use("/rooms", roomRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`StayEZ server running on http://localhost:${PORT}`);
});