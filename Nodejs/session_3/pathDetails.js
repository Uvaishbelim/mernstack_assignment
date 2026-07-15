const path = require("path");

const filePath = "/user/music/playlist.txt";

const directoryName = path.dirname(filePath);
const baseName = path.basename(filePath);
const fileExtension = path.extname(filePath);

console.log("Directory name:", directoryName);
console.log("Base name:", baseName);
console.log("File extension:", fileExtension);
