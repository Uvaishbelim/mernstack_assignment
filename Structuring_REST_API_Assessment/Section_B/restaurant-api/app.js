const express = require("express");

const app = express();

app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurant"));

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,

      message: "Maximum file size is 2MB.",
    });
  }

  if (err.message === "Only JPG and PNG files are allowed.") {
    return res.status(400).json({
      success: false,

      message: err.message,
    });
  }

  next(err);
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
