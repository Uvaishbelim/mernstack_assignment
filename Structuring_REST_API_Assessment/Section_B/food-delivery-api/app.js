const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
const menuRoutes = require("./routes/menu");

app.use("/api/menu", menuRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});