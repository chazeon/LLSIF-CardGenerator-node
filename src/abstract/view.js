const _ = require("lodash")
const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))

const layer = require("./layer")
const properties = require("../value/properties")

class View {
    get layers() { return [] }
    getBuffer() {}
    toFile(loc) {
        return this.getBuffer()
        .then(buf => fs.writeFileAsync(loc, buf))
    }
}

class CardView extends View {
    constructor(unit, options) {
        super()
        this.unit = unit

        this.evolutionLayer =   new layer.EvolutionLayer(unit)
        this.rarityLayer =      new layer.RarityLayer(unit)
        this.nameLayer =        new layer.NameLayer(unit)
        this.starLayer =        new layer.StarLayer(unit)
        this.frameLayer =       new layer.CardFrameLayer(unit)
        this.flashLayer =       new layer.FlashLayer(unit)
        this.naviLayer =        new layer.CardNaviLayer(unit)
        this.backgroundLayer =  new layer.CardBackgroundLayer(unit)
        this.emptyLayer =       new layer.CardEmptyLayer(unit)

        this.options = options === undefined ? {} : options
    }
    get mode() { return this.options.mode === undefined ? 'framed' : this.options.mode }
    get layers() {
        if (this.mode === 'frameless')
            if (this.flashLayer.assetPath)
                return [ this.flashLayer ]
            else
                return [
                    this.backgroundLayer,
                    this.naviLayer
                ]
        else if (this.mode === 'transparent')
            /*
            if (this.flashLayer.assetPath)
                return [ this.flashLayer ]
            else
                return [
                    this.emptyLayer,
                    this.naviLayer
                ]
        */
            return [
                this.emptyLayer,
                this.naviLayer
            ]
        else /* if (this.mode === 'framed') */
            if (this.flashLayer.assetPath)
                return [
                    this.flashLayer,
                    this.frameLayer,
                    this.starLayer,
                    this.nameLayer,
                    this.rarityLayer,
                    this.evolutionLayer
                ]
            else
                return [
                    this.backgroundLayer,
                    this.naviLayer,
                    this.frameLayer,
                    this.starLayer,
                    this.nameLayer,
                    this.rarityLayer,
                    this.evolutionLayer
                ]
    }
}

class IconView extends View {
    constructor(unit, options) {
        super()
        this.frameLayer =       new layer.IconFrameLayer(unit)
        this.naviLayer =        new layer.IconNaviLayer(unit)
        this.backgroundLayer =  new layer.IconBackgroundLayer(unit)

        this.options = options === undefined ? {} : options
    }
    get mode() { return this.options.mode === undefined ? 'framed' : this.options.mode }
    get layers() {
        if (this.mode === 'frameless')
            return [
                this.backgroundLayer,
                this.naviLayer,
            ]
        else if (this.mode === 'transparent')
            return [ this.naviLayer ]
        else /* if (this.mode === 'framed') */
            return [
                this.backgroundLayer,
                this.naviLayer,
                this.frameLayer
            ]
    }
}

class PairView extends View {
    constructor(pair, cardViews) {
        super()
        this._pair = pair
        this._cardViews = cardViews
    }
    get pair() { return this._pair }
    /* card */
    get cardViews() { return this._cardViews }
    get leftCardView() { return this.cardViews[properties.pairPosition.LEFT] }
    get rightCardView() { return this.cardViews[properties.pairPosition.RIGHT] }
    getCardViewOfPosition(position) { return this.cardViews[position] }

    /* layers */
    //getLayersOfPosition(position) { return this.getCardViewOfPosition(position).layers }
    //get layers() { return [this.leftCard.flashLayer, this.rightCard.flashLayer] }
}

module.exports = {
    View,
    CardView,
    IconView,
    PairView
}