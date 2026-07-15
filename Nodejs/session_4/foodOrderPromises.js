function selectRestaurant(restaurantName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!restaurantName) {
        reject(new Error("Restaurant name is required"));
        return;
      }
      resolve(`Restaurant selected: ${restaurantName}`);
    }, 1000);
  });
}
function selectFood(foodName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!foodName) {
        reject(new Error("Food name is required"));
        return;
      }
      resolve(`Food selected: ${foodName}`);
    }, 1000);
  });
}
function placeOrder(foodName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!foodName) {
        reject(new Error("Cannot place an empty order"));
        return;
      }
      resolve(`Order placed successfully for ${foodName}`);
    }, 1000);
  });
}
selectRestaurant("Spice Garden")
  .then((message) => {
    console.log(message);
    return selectFood("Delhi Biryani");
  })
  .then((message) => {
    console.log(message);
    return placeOrder("Delhi Biryani");
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error("Order error:", error.message);
  });
