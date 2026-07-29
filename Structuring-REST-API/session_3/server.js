const express = require("express");

const generateAuthToken = require("./utils/generateAuthToken");

const verifyToken = require("./middleware/verifyToken");

const app = express();

app.use(express.json());


// ======================================
// Login Route
// ======================================

app.post("/login", (req, res) => {

    const user = {

        id: 1,

        email: "uvaish@gmail.com"

    };

    const token = generateAuthToken(user);

    res.json({

        token

    });

});


// ======================================
// Protected Route
// ======================================

app.get("/my-orders", verifyToken, (req, res) => {

    const orders = [

        {

            orderId: 101,

            itemName: "Pizza"

        },

        {

            orderId: 102,

            itemName: "Burger"

        },

        {

            orderId: 103,

            itemName: "Cold Drink"

        }

    ];

    res.json({

        user: req.user,

        orders

    });

});


app.listen(5000, () => {

    console.log("Server Running On Port 5000");

});