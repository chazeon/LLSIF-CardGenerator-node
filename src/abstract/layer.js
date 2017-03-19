const _ = require("lodash")

const properties = require("../value/properties")

class Layer {
    constructor() {}
    get moveX() { return 0 }
    get moveY() { return 0 }
    get sizeRatio() { return 1.0 }
    get assetPath() { return null }
    get move() { return this.moveX + this.moveY }
}

class UnitLayer extends Layer {
    constructor(unit) {
        super()
        this._unit = unit
    }
    get unit() { return this._unit }
}

class StarLayer extends UnitLayer {
    get assetPath() { return `assets/image/cards/star/s_${this.unit.rarityStarId}.png` }
}

class EvolutionLayer extends UnitLayer {
    get assetPath() {
        if (this.unit.rankedMax) return `assets/image/cards/evolution/ev_01.png`
        else return null
    }
}

class RarityLayer extends UnitLayer {
    get assetPath() { return `assets/image/cards/rarity/r_${this.unit.attributeName}_${this.unit.rarityName}.png` }
}

class NameLayer extends UnitLayer {
    get assetPath() { return this.unit.nameAssetPath }
}

class CardFrameLayer extends UnitLayer {
    get assetPath() {
        return `assets/image/cards/frame/f_${this.unit.rarityName}_${this.unit.attributeFrameId}.png`
    }
}

class IconFrameLayer extends UnitLayer {
    get assetPath() { return `assets/image/cards/icon/f_${this.unit.rarityName}_${this.unit.attributeIconFrameId}.png` }
}

class CardNaviLayer extends UnitLayer {
    get moveX() { return this.unit.moveX }
    get moveY() { return this.unit.moveY }
    get sizeRatio() { return this.unit.sizeRatio }
    get assetPath() { return this.unit.assetPath }
}

class IconNaviLayer extends UnitLayer {
    get assetPath() { return this.unit.iconAssetPath }
}

class IconBackgroundLayer extends UnitLayer {
    get assetPath() {
        if (this.unit.attributeId === properties.attributeId.ALL)
            return `assets/image/cards/icon/b_${this.unit.attributeName}_${this.unit.rarityName}_001.png`
        else
            return `assets/image/cards/icon/b_${this.unit.attributeName}_${this.unit.rarityName}_${_.padStart(this.unit.rankedMaxId, 3, '0')}.png`
    }
}

class CardBackgroundLayer extends UnitLayer {
    get assetPath() {
        if (this.unit.rarityId === properties.rarityId.SSR ||
            this.unit.rarityId === properties.rarityId.UR)
            return "empty.png"
        else if (this.unit.attributeId === properties.attributeId.ALL) {
            return `assets/image/cards/background/b_${this.unit.attributeName}_${this.unit.rarityName}_001.png`
        }
        else {
            return `assets/image/cards/background/b_${this.unit.attributeName}_${this.unit.rarityName}_${_.padStart(this.unit.rankedMaxId, 3, '0')}.png`
        }
    }
}

class FlashLayer extends UnitLayer {
    get assetPath() { return this.unit.flashAssetPath }
}

module.exports = {
    Layer,
    UnitLayer,
    StarLayer,
    EvolutionLayer,
    RarityLayer,
    NameLayer,
    CardNaviLayer,
    FlashLayer,
    CardFrameLayer,
    CardBackgroundLayer,
    IconFrameLayer,
    IconNaviLayer,
    IconBackgroundLayer
}