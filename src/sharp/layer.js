const sharp = require("sharp")
const Promise = require("bluebird")
const _ = require("lodash")
const sharpLoad = require("./load")

function composite(back, front) {
    return new Promise((resolve, reject) => {
        let frontImg = sharpLoad(front)
        let backImg = sharpLoad(back)
        if (!frontImg) return resolve(back)
        if (!backImg) return resolve(front)
        return Promise.resolve(backImg.metadata())
        .then(backMetadata =>
            Promise.resolve(frontImg.metadata())
            .then(frontMetadata => {
                return Promise.resolve(frontImg
                    .resize(parseInt(frontMetadata.width * front.sizeRatio))
                    .extract({ left: -front.moveX, top: -front.moveY, width: backMetadata.width, height: backMetadata.height })
                    .toBuffer()
                )
            }
            )
        )
        .then(buffer => Promise.resolve(backImg.overlayWith(buffer).toBuffer()))
        .then(buffer => resolve(buffer))
    })
}

function mergeLayers(layerStack) {
    if (layerStack.length > 1)
        return _.clone(layerStack).reduce((promise, curLayer) =>
            Promise.is(promise) ? promise.then(curBack => composite(curBack, curLayer)) : composite(promise, curLayer)
        )
    else if (Buffer.isBuffer(layerStack[0]))
        return new Promise((resolve) => resolve(layerStack[0]))
    else
        return sharpLoad(layerStack[0]).toBuffer()
}

module.exports = mergeLayers