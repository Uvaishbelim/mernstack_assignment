const users = [
  { username: "uvaish", name: "Uvaish Belim", age: 24 },
  { username: "rahul", name: "Rahul Sharma", age: 23 },
  { username: "priya", name: "Priya Patel", age: 25 },
];

function getUserProfile(username, callback) {
  console.log(`Searching for ${username}...`);

  // Simulate a two-second database or API delay
  setTimeout(() => {
    const user = users.find((item) => item.username === username);
    if (!user) {
      callback(new Error("User not found"), null);
      return;
    }
    callback(null, user);
  }, 2000);
}

getUserProfile("uvaish", (error, user) => {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log("User profile:", user);
});
