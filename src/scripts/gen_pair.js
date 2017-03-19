const UnitFactory = require("../dbapi/factory")
const SharpViewFactory = require("../sharp").factory

const unitFactory = new UnitFactory()
const viewFactory = new SharpViewFactory()

const fs = require("fs")
const path = require("path")

const config = require("../config")

unitFactory.createAllPairs()
.map(pair => {
    return new Promise((resolve, reject) => {
        let filename = path.join(config.dir.generated, `framed/pairs/${pair.pairId}.png`)
        if (!fs.existsSync(filename))
            viewFactory.createPairView(pair).toFile(filename)
            .then(() => resolve(pair))
            .catch(err => reject(err))
        else
            resolve(pair)
    })
}, { concurrency: 5 })
.map(pair => {
    return new Promise((resolve, reject) => {
        let filename = path.join(config.dir.generated, `frameless/pairs/${pair.pairId}.png`)
        if (!fs.existsSync(filename))
            viewFactory.createPairView(pair, { framed: false }).toFile(filename)
            .then(() => resolve(pair))
            .catch(err => reject(err))
        else
            resolve(pair)
    })
}, { concurrency: 5 })