const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();


// Middleware
app.use(express.json());

app.use(logger);


// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Product Inventory API is running"
    });
});


// Product routes
app.use("/products", productRoutes);


// Global error handler
app.use(errorHandler);


// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });