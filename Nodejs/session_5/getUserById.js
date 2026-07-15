function getUserById(userId) {
  // Validate the userId before processing it
  if (typeof userId !== "number" || !Number.isFinite(userId) || userId <= 0) {
    throw new Error("Invalid userId");
  }
  // Return fake user data when the ID is valid
  return { id: userId, name: "Uvaish Belim", role: "MERN Stack Developer" };
}
// Successful test
try {
  const user = getUserById(101);
  console.log("User found:", user);
} catch (error) {
  console.error("Error:", error.message);
}
// Failure test
try {
  const user = getUserById(-5);
  console.log("User found:", user);
} catch (error) {
  console.error("Error:", error.message);
}
