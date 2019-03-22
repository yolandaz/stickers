const fs = require('fs');
const download = require('image-downloader');
const path = require('path');

const { stickerPackName, isGif, urls } = require('./data.js');

const dir = path.join(__dirname, stickerPackName);
const dirRaw = path.join(dir, "raw");
const dest = isGif ? dirRaw : dir;

// create folder if not exists
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
if (isGif && !fs.existsSync(dirRaw)) {
    fs.mkdirSync(dirRaw);
}

// download the urls
async function downloadUrls() {
    await Promise.all(urls.map(async(url) => {
        try {
            await download.image({ url, dest })
        } catch (e) {
            console.error(e)
        }
    }));
}

// name the files
const renameFiles = () => {
    const files = fs.readdirSync(dest);

    files.forEach((file, index) => {
        const filePath = path.join(dest, file);
        const newFileName = "m-" + stickerPackName + "-" + index + ".png";
        const newFilePath = path.join(dest, newFileName);
        fs.renameSync(filePath, newFilePath);
    });
}

downloadUrls().then(() => {
    if (!isGif) {
        renameFiles();
    }
});