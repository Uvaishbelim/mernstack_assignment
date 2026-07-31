const express = require("express");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);

router.get("/", (req, res) => {

    res.json([
        {
            id: 1,
            status: "Delivered"
        }
    ]);

});

module.exports = router;