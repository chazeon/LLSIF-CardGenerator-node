const _ = require("lodash")

const properties = require("../value/properties")

class Unit {
    constructor(model, rankedMax) {
        this._model = model
        this._rankedMax = rankedMax ? true : false
    }

    /* models */
    get unitModel() { return this._model }
    get normalAssetModel() { return this.unitModel["normal_unit_navi_asset"] }
    get rankMaxAssetModel() { return this.unitModel["rank_max_unit_navi_asset"] }
    get unitTypeModel() { return this.unitModel["unit_type"] }

    /* card asset */
    get normalCardAsset() { return this._normalCardAsset }
    get rankMaxCardAsset() { return this._rankMaxCardAsset }

    /* rankMax */
    get rankedMax() { return this._rankedMax }
    set rankedMax(value) { this._rankedMax = value ? true : false }
    get rankedMaxId() { return this.rankedMax + 1 }

    /* assets */
    get assetModel() {
        return this.rankedMax ? this._rankMaxAssetModel : this._normalAssetModel
    }
    get cardAsset() {
        if (!this.rankMaxCardAsset) console.log(this)
        return this.rankedMax ? this.rankMaxCardAsset : this.normalCardAsset
    }

    /* properties */
    get rarityId() { return this.unitModel["rarity"] }
    get rarityName() {
        return properties.rarityName[this.rarityId.toString()]
    }
    get rarityLevel() { return properties.rarityLevel[this.rarityId.toString()] }
    get rarityStarId() {
        let value = (this.rarityLevel << 1) + this.rankedMax - 1
        return _.padStart(value.toString(), 3, "0")
    }

    get attributeId() { return this.unitModel["attribute_id"] }
    get attributeName() {
        return properties.attributeName[this.attributeId.toString()]
    }
    get attributeFrameId() {
        if (this.rarityId > properties.rarityId.R) return 4
        else if (this.attributeId === properties.attributeId.ALL) return 9
        else return this.attributeId
    }
    get attributeIconFrameId() {
        if (this.attributeId === properties.attributeId.ALL) return 9
        else return this.attributeId
    }

    get cardId() { return this.cardAsset.cardId }

    /* coordinates */
    get moveX() { return this.cardAsset.moveX }
    get moveY() { return this.cardAsset.moveY }
    get sizeRatio() { return this.cardAsset.sizeRatio }

    /* paths */
    get assetPath() { return this.cardAsset.assetPath }
    get flashAssetPath() { return this.cardAsset.flashAssetPath }
    get nameAssetPath() { return this.unitTypeModel["name_image_asset"] }
    get normalIconAssetPath() { return this.unitModel["normal_icon_asset"] }
    get rankMaxIconAssetPath() { return this.unitModel["rank_max_icon_asset"] }
    get iconAssetPath() { return this.rankedMax ? this.rankMaxIconAssetPath : this.normalIconAssetPath }
}

class CardAsset {
    constructor(assetModel, cardModel) {
        this._assetModel = assetModel
        this._cardModel = cardModel
    }


    /* model */
    get assetModel() { return this._assetModel }
    get cardModel() { return this._cardModel }

    /* coordinates */
    get moveX() { return this.cardModel["navi_move_x"] }
    get moveY() { return this.cardModel["navi_move_y"] }
    get sizeRatio() { return this.cardModel["navi_size_ratio"] }

    /* path */
    get assetPath() { return this.assetModel["unit_navi_asset"] }
    get flashAssetPath() { return this.cardModel["flash_asset"] }

    /* properties */
    get cardId() { return this.cardModel["card_id"] }
}

module.exports = {
    Unit, CardAsset
}