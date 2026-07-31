const express = require("express");

const app = express();

app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurant"));
app.use("/api/orders", require("./routes/order"));

// Static Upload Folder
app.use("/uploads", express.static("uploads"));

// Centralized Error Handler
app.use(require("./middleware/errorMiddleware"));

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});