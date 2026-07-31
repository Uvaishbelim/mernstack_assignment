const express = require("express");

const router = express.Router();

const menuController = require("../controllers/menuController");

// GET ALL
router.get("/", menuController.getAll);

// GET BY ID
router.get("/:id", menuController.getById);

// CREATE
router.post("/", menuController.create);

// UPDATE
router.put("/:id", menuController.update);

// DELETE
router.delete("/:id", menuController.delete);

module.exports = router;
