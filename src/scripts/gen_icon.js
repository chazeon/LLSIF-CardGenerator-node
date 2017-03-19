const UnitFactory = require("../dbapi/factory")
const SharpViewFactory = require("../sharp").factory

const unitFactory = new UnitFactory()
const viewFactory = new SharpViewFactory()

const fs = require("fs")
const path = require("path")

const config = require("../config")

unitFactory.createAllUnits()
.map(unit => {
    return new Promise((resolve, reject) => {
        unit.rankedMax = true
        let iconView = viewFactory.createIconView(unit)
        let filename = path.join(config.dir.generated, `framed/icons/${unit.cardId}.png`)
        if (!fs.existsSync(filename))
            return iconView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
    //cardView.toFile(`runtime/generated/cards/${unit.cardId}.png`)
    //if (unit.cardAsset && unit.cardId < 10) console.log(unit.rankedMax,unit.cardId, unit.assetPath)
}, { concurrency: 5 })
.map(unit => {
    return new Promise((resolve, reject) => {
        unit.rankedMax = false
        let iconView = viewFactory.createIconView(unit)
        let filename = path.join(config.dir.generated, `framed/icons/${unit.cardId}.png`)
        if (!fs.existsSync(filename))
            return iconView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
   //cardView.toFile(`card/${unit.cardId}.png`)
    //if (unit.cardAsset && unit.cardId < 10) console.log(unit.rankedMax, unit.cardId, unit.assetPath)
}, { concurrency: 5 })
.then(() => console.log("Job done!"))