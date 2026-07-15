const EventEmitter = require("events");
const notificationEmitter = new EventEmitter();

// Listen for new chat messages
notificationEmitter.on("newMessage", () => {
  console.log("You have a new message!");
});

// Listen for new followers
notificationEmitter.on("newFollower", (username) => {
  console.log(`You are followed by ${username}`);
});

// Trigger message events
notificationEmitter.emit("newMessage");
notificationEmitter.emit("newMessage");

// Trigger follower events and pass usernames
notificationEmitter.emit("newFollower", "Rahul"); notificationEmitter.emit("newFollower", "Priya"); notificationEmitter.emit("newFollower", "Aman");