const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const controller = require("../controllers/restaurantController");

router.use(auth);

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

router.post("/:id/menu", controller.addMenu);

router.post("/:id/image", upload.single("image"), controller.uploadImage);

module.exports = router;
