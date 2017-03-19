const path = require("path")
const fs = require("fs")

const config = require("../config")

function resolveLocalPath(uri) {
    if (!uri) return null
    else {
        let external = path.resolve(config.dir.external, uri)
        let internal = path.resolve(config.dir.internal, uri)
        if (fs.existsSync(external)) return external
        else if (fs.existsSync(internal)) return internal
        else throw new Error(`File not found, \`${uri}\`.`)
    }
}
module.exports = resolveLocalPath