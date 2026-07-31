const restaurants = require("../data/restaurants.json");

// GET ALL
exports.getAll = (req, res) => {
    res.json(restaurants);
};

// GET BY ID
exports.getById = (req, res) => {

    const restaurant = restaurants.find(
        r => r.id == req.params.id
    );

    if (!restaurant) {

        return res.status(404).json({
            message: "Restaurant Not Found"
        });

    }

    res.json(restaurant);

};

// CREATE
exports.create = (req, res) => {

    const restaurant = {

        id: restaurants.length + 1,

        name: req.body.name,

        cuisine: req.body.cuisine,

        menu: []

    };

    restaurants.push(restaurant);

    res.status(201).json(restaurant);

};

// UPDATE
exports.update = (req, res) => {

    const restaurant = restaurants.find(
        r => r.id == req.params.id
    );

    if (!restaurant) {

        return res.status(404).json({
            message: "Restaurant Not Found"
        });

    }

    restaurant.name =
        req.body.name || restaurant.name;

    restaurant.cuisine =
        req.body.cuisine || restaurant.cuisine;

    res.json(restaurant);

};

// DELETE
exports.delete = (req, res) => {

    const index = restaurants.findIndex(
        r => r.id == req.params.id
    );

    if (index == -1) {

        return res.status(404).json({
            message: "Restaurant Not Found"
        });

    }

    restaurants.splice(index, 1);

    res.json({
        message: "Restaurant Deleted"
    });

};

// ADD MENU ITEM
exports.addMenu = (req, res) => {

    const restaurant = restaurants.find(
        r => r.id == req.params.id
    );

    if (!restaurant) {

        return res.status(404).json({
            message: "Restaurant Not Found"
        });

    }

    const { name, price, category } = req.body;

    if (!name) {

        return res.status(400).json({
            field: "name",
            message: "Name Required"
        });

    }

    if (
        typeof price !== "number" ||
        price <= 0
    ) {

        return res.status(400).json({
            field: "price",
            message: "Price Must Be Positive"
        });

    }

    if (!category) {

        return res.status(400).json({
            field: "category",
            message: "Category Required"
        });

    }

    restaurant.menu.push({
        id: restaurant.menu.length + 1,
        name,
        price,
        category
    });

    res.status(201).json(restaurant.menu);

};

// IMAGE
exports.uploadImage = (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            message: "Image Required"
        });

    }

    res.json({
        filename: req.file.filename
    });

};