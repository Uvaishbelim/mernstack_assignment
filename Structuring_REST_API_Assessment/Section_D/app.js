const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const SECRET = "secretKey";

app.post("/api/orders", (req, res) => {
  const { customerId, restaurantId, menuItems } = req.body;

  if (!customerId || typeof customerId !== "string") {
    return res.status(400).json({
      message: "customerId is required and must be a string.",
    });
  }

  if (!restaurantId || typeof restaurantId !== "string") {
    return res.status(400).json({
      message: "restaurantId is required and must be a string.",
    });
  }

  if (!Array.isArray(menuItems)) {
    return res.status(400).json({
      message: "menuItems must be an array.",
    });
  }

  if (menuItems.length === 0) {
    return res.status(400).json({
      message: "menuItems must contain at least one item.",
    });
  }

  const token = jwt.sign(
    {
      customerId,
      restaurantId,
      menuItems,
    },
    SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.status(200).json({
    success: true,
    token,
  });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
