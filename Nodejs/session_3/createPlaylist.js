const fs = require("fs");

const favoriteSongs = [
  "Blinding Lights",
  "Perfect",
  "Believer",
  "Shape of You",
  "Counting Stars",
];

// Convert the array into a string.
// \n adds every song on a new line.
const playlistData = favoriteSongs.join("\n");

fs.writeFile("playlist.txt", playlistData, (error) => {
  if (error) {
    console.log("Error while creating playlist:", error);
    return;
  }

  console.log("Playlist created successfully!");
});