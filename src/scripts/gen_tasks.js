const UnitFactory = require("../dbapi/factory")
const SharpViewFactory = require("../sharp").factory

const unitFactory = new UnitFactory()
const viewFactory = new SharpViewFactory()

const _ = require('lodash')
const sharp = require('sharp')

const combine = require('./combine.js')

class ImageGenerationTask {
    constructor (option) {
        this.option = option
        if (this.isPair) this.pair = _.clone(option.pair)
        else {
            this.unit = _.clone(option.unit)
            this.unit.rankedMax = this.option.rankedMax
        }
    }
    get isPair() { return this.type === 'pair' }
    get isCard() { return this.type === 'card' }
    get isIcon() { return this.type === 'icon' }
    get isThumbnail() { return this.option.thumb }
    get type() { return this.option.type }
    get mode() { return this.option.mode }
    get imageId () {
        if (this.isPair) return this.pair.pairId
        return this.unit.cardId
    }
    get path() {
        if (!this.isThumbnail)
            return `${this.mode}/${this.type}/${this.imageId}.png`
        else
            return `thumb/${this.mode}/${this.type}/${this.imageId}.png`
    }
    get view() {
        if      (this.isCard) return viewFactory.createCardView(this.unit, { mode: this.mode })
        else if (this.isIcon) return viewFactory.createIconView(this.unit, { mode: this.mode })
        else if (this.isPair) return viewFactory.createPairView(this.pair, { mode: this.mode })
    }
    async getBuffer() {
        if (!this.isThumbnail)
            return await this.view.getBuffer()
        else {
            return await sharp(await this.view.getBuffer())
                .resize(null, 360)
                .png({ progressive: true })
                .toBuffer()
        }
    }
}

async function genSingleTasks() {
    return combine({
        rankedMax: [ true, false ],
        type: [ 'card', 'icon' ],
        mode: [ 'framed', 'frameless', 'transparent' ],
        thumb: [ false ],
        unit: await unitFactory.createAllUnits()
    }).map(option => new ImageGenerationTask(option))
}

async function genSingleThumbTasks() {
    return combine({
        rankedMax: [ true, false ],
        type: [ 'card' ],
        mode: [ 'framed', 'frameless', 'transparent' ],
        thumb: [ true ],
        unit: await unitFactory.createAllUnits()
    }).map(option => new ImageGenerationTask(option))
}

async function genPairTasks() {
    return combine({
        type: [ 'pair' ],
        mode: [ 'framed', 'frameless' ],
        thumb: [ false ],
        pair: await unitFactory.createAllPairs()
    }).map(option => new ImageGenerationTask(option))
}

async function genPairThumbTasks() {
    return combine({
        type: [ 'pair' ],
        mode: [ 'framed', 'frameless' ],
        thumb: [ true ],
        pair: await unitFactory.createAllPairs()
    }).map(option => new ImageGenerationTask(option))
}

async function genAllTasks() {
    return _.concat(
        //await genPairThumbTasks(),
        await genSingleTasks(),
        //await genSingleThumbTasks(),
        await genPairTasks()
    )
}

module.exports = genAllTasks