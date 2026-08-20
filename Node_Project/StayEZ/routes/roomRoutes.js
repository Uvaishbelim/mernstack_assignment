const express = require("express");

const {
    getRooms,
    searchRooms
} = require("../controllers/roomController");

const router = express.Router();


// GET /rooms
router.get("/", getRooms);


// GET /rooms/search?location=Goa
router.get("/search", searchRooms);


module.exports = router;