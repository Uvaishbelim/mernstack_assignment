const fs = require("fs").promises;

async function loadRestaurantData() {
    try {

        // Read restaurants.json file asynchronously
        const data = await fs.readFile("./restaurants.json", "utf-8");

        // Convert JSON string into JavaScript array
        const restaurants = JSON.parse(data);

        console.log("Restaurant List");
        console.log("-----------------------");

        // Print restaurant name and cuisine
        restaurants.forEach((restaurant) => {
            console.log(
                `Name: ${restaurant.name} | Cuisine: ${restaurant.cuisine}`
            );
        });

        // Success message
        console.log("\nRestaurant data loaded successfully");

    } catch (error) {

        if (error.code === "ENOENT") {
            console.log("Error: restaurants.json file not found.");
        } else if (error instanceof SyntaxError) {
            console.log("Error: Invalid JSON format in restaurants.json.");
        } else {
            console.log("Unexpected Error:", error.message);
        }

    }
}

// Call function
loadRestaurantData();