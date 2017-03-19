const sharp = require("sharp")
const Promise = require("bluebird")

const resolveLocalPath = require("./path")
const sharpLoad = require("./load")

function joinPair(left, right) {
    let leftImg = sharpLoad(left)
    let rightImg = sharpLoad(right)
    return Promise.resolve(leftImg.metadata()).then(leftMetadata =>
        Promise.resolve(leftImg.toBuffer())
        .then(leftBuf => Promise.resolve(
            rightImg
                .extend({left: leftMetadata.width, right: 0, top: 0, bottom:0})
                .overlayWith(leftBuf, {left: 0, top: 0}).toBuffer()))
    )
}

module.exports = joinPair