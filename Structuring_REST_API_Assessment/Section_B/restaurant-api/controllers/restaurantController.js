let restaurants = [];

const createRestaurant = (req, res) => {

    const restaurant = {

        id: restaurants.length + 1,

        name: req.body.name,

        cuisine: req.body.cuisine

    };

    restaurants.push(restaurant);

    res.status(201).json({
        success: true,
        data: restaurant
    });

};

const updateRestaurant = (req, res) => {

    const id = Number(req.params.id);

    const restaurant = restaurants.find(
        r => r.id === id
    );

    if (!restaurant) {

        return res.status(404).json({
            message: "Restaurant not found"
        });

    }

    restaurant.name = req.body.name || restaurant.name;
    restaurant.cuisine = req.body.cuisine || restaurant.cuisine;

    res.status(200).json({
        success: true,
        data: restaurant
    });

};

const uploadImage = (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            success: false,
            message: "Please upload an image."
        });

    }

    res.status(200).json({

        success: true,

        filename: req.file.filename

    });

};

module.exports = {

    createRestaurant,

    updateRestaurant,

    uploadImage

};