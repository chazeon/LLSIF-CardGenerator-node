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
        let cardView = viewFactory.createCardView(unit)
        let filename = path.join(config.dir.generated, `framed/cards/${unit.cardId}.png`)
        if (!fs.existsSync(filename))
            return cardView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
}, { concurrency: 5 })
.map(unit => {
    return new Promise((resolve, reject) => {
        unit.rankedMax = false
        let cardView = viewFactory.createCardView(unit)
        let filename = path.join(config.dir.generated, `framed/cards/${unit.cardId}.png`)
        if (!fs.existsSync(filename))
            return cardView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
}, { concurrency: 5 })
.map(unit => {
    return new Promise((resolve, reject) => {
        unit.rankedMax = true
        let cardView = viewFactory.createCardView(unit, { mode: 'frameless' })
        let filename = `runtime/generated/frameless/cards/${unit.cardId}.png`
        if (!fs.existsSync(filename))
            return cardView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
}, { concurrency: 5 })
.map(unit => {
    return new Promise((resolve, reject) => {
        unit.rankedMax = false
        let cardView = viewFactory.createCardView(unit, { mode: 'frameless' })
        let filename = `runtime/generated/frameless/cards/${unit.cardId}.png`
        if (!fs.existsSync(filename))
            return cardView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
}, { concurrency: 5 })
.map(unit => {
    return new Promise((resolve, reject) => {
        unit.rankedMax = true
        let cardView = viewFactory.createCardView(unit, { mode: 'transparent' })
        let filename = `runtime/generated/transparent/cards/${unit.cardId}.png`
        if (!fs.existsSync(filename))
            return cardView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
}, { concurrency: 5 })
.map(unit => {
    return new Promise((resolve, reject) => {
        unit.rankedMax = false
        let cardView = viewFactory.createCardView(unit, { mode: 'transparent' })
        let filename = `runtime/generated/transparent/cards/${unit.cardId}.png`
        if (!fs.existsSync(filename))
            return cardView.toFile(filename)
            .then(() => resolve(unit))
            .catch(err => reject(err))
        else resolve(unit)
    })
}, { concurrency: 5 })
.then(() => console.log("Job done!"))