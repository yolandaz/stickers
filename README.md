# setup

1. `npm i`
  - if `node-canvas` fails to install, try `brew install pkg-config cairo libpng jpeg giflib` and `export PKG_CONFIG_PATH="/usr/local/opt/libffi/lib/pkgconfig"`

# how to download a sticker pack

1. open a sticker pack on messenger
2. if the stickers are animated, hover over all the stickers so that the animated version will be loaded
3. run in console (urls will be copied to clipboard)

```javascript
stickers = Array.from(document.querySelectorAll('.uiGrid._51mz._5f0n ._5r8i'))
copy(stickers.map(el => el.style.backgroundImage).map(s => s.substring(5, s.length - 2)))
```

4. paste the urls into `data.js`
5. also set `stickerPackName` (what you want to name the images) and `isGif` 
6. run `node step1.js`

if your sticker pack is not animated: YAY you're done... time to rename

if your sticker pack is animated:

7. rename each sticker sheet to `name.row.col.skipLast` (for example: `bounce.3.4.2.png`)
    * `name`: the name you want the output gif to be
    * `row` and `cols`: number of rows columns in the spritesheet
    * `skipLast`: the number of blank frames at the end to be skipped
8. run `node step2.js`
