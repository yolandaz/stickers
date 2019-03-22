const fs = require('fs');
const GifFromSprite = require('gif-from-sprite');
const path = require('path');

const { stickerPackName, isGif, urls } = require('./data.js');

const dir = path.join(__dirname, stickerPackName);
const dirRaw = path.join(dir, "raw");

// get filenames
var files = fs.readdirSync(dirRaw);
files.forEach(fileName => {
    // don't get anything hidden
    if (!(/(^|\/)\.[^\/\.]/g).test(fileName)) {
        const data = fileName.split(".");
        const stickerName = data[0];
        const rows = data[1];
        const cols = data[2];
        const skipLast = data[3];

        const fromFile = path.join(dirRaw, fileName);
        const newFileName = "m-" + stickerPackName + "-" + stickerName + ".gif";
        const toFile = path.join(dir, newFileName);

        GifFromSprite.create(fromFile, toFile, 0, rows, cols, skipLast);
    }
});