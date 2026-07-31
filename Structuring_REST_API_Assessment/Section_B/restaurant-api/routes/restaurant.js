const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const restaurantController = require("../controllers/restaurantController");

// Protected Route
router.post("/", auth, restaurantController.createRestaurant);

// Protected Route
router.patch("/:id", auth, restaurantController.updateRestaurant);

// Protected Upload Route
router.post(
  "/:id/image",
  auth,
  upload.single("image"),
  restaurantController.uploadImage
);

module.exports = router;
