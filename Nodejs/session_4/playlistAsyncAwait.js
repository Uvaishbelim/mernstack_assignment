const playlists = [
  { name: "Workout", songs: ["Believer", "Hall of Fame"] },
  { name: "Chill", songs: ["Perfect", "Photograph"] },
];
function fetchPlaylist(playlistName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const playlist = playlists.find((item) => item.name === playlistName);
      if (!playlist) {
        reject(new Error("Playlist not found"));
        return;
      }
      resolve(playlist);
    }, 1000);
  });
}
function addSongToPlaylist(playlist, newSong) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!newSong) {
        reject(new Error("Song name is required"));
        return;
      }
      playlist.songs.push(newSong);
      resolve(playlist);
    }, 1000);
  });
}
async function updatePlaylist() {
  try {
    const playlist = await fetchPlaylist("Workout");
    console.log("Playlist found:", playlist);
    const updatedPlaylist = await addSongToPlaylist(
      playlist,
      "Eye of the Tiger"
    );
    console.log("Updated playlist:", updatedPlaylist);
  } catch (error) {
    console.error("Playlist error:", error.message);
  }
}
updatePlaylist();
