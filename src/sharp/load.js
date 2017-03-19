const sharp = require("sharp")

const resolveLocalPath = require("./path")

function sharpLoad(layer) {
    if (Buffer.isBuffer(layer)) return sharp(layer)
    else if (!layer)            return null
    else if (layer.assetPath)   return sharp(resolveLocalPath(layer.assetPath))
    else                        return null
}

module.exports = sharpLoad