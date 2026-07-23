const playlists = [

    {
        name: "Top Hits 2026",
        songs: 50
    },

    {
        name: "Workout Mix",
        songs: 35
    },

    {
        name: "Chill Vibes",
        songs: 20
    }

];

const getPlaylists = () => {

    return playlists;

};

const createPlaylist = (playlist) => {

    playlists.push(playlist);

    return playlist;

};

module.exports = {
    getPlaylists,
    createPlaylist
};