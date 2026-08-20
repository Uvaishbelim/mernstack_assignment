const Room = require("../models/room");


// Hardcoded room data
const rooms = [
    new Room(
        "Luxury Beach Villa",
        "Goa",
        5000,
        ["WiFi", "Swimming Pool", "AC", "Sea View"]
    ),

    new Room(
        "Cozy Mountain Cottage",
        "Manali",
        3500,
        ["WiFi", "Fireplace", "Parking", "Mountain View"]
    ),

    new Room(
        "Modern City Apartment",
        "Mumbai",
        4500,
        ["WiFi", "AC", "Kitchen", "Gym"]
    ),

    new Room(
        "Heritage Palace Suite",
        "Jaipur",
        6000,
        ["WiFi", "AC", "Breakfast", "Garden"]
    ),

    new Room(
        "Peaceful Lake House",
        "Udaipur",
        5500,
        ["WiFi", "Lake View", "Parking", "Kitchen"]
    )
];


// GET /rooms
const getRooms = (req, res) => {
    res.json(rooms);
};


// GET /rooms/search?location=Goa
const searchRooms = (req, res) => {

    const location = req.query.location;

    const filteredRooms = rooms.filter((room) => {
        return room.location.toLowerCase() === location.toLowerCase();
    });

    res.json(filteredRooms);
};


module.exports = {
    getRooms,
    searchRooms
};