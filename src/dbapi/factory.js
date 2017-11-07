const Promise = require("bluebird")
const _ = require("lodash")

const model = require("../model")
const Unit = require("./unit").Unit
const Pair = require("./pair")
const CardAsset = require("./unit").CardAsset

class UnitFactory {
    constructor() {}
    createUnitWithModel(model, rankedMax) {
        return new Promise((resolve, reject) => {
            let unit = new Unit(model, rankedMax)
            this.bindNormalAsset(unit)
            .then(unit => this.bindRankMaxAsset(unit))
            .then(unit => resolve(unit))
        })
    }
    createCardAsset(assetModel) {
        return new Promise((resolve, reject) =>
            model.CardModel
            .findOne({ where: { unit_navi_asset_id: assetModel["unit_navi_asset_id"] } })
            .then(cardModel => resolve(new CardAsset(assetModel, cardModel)))
            .catch(err => reject(err))
        )
    }
    bindNormalAsset(unit) {
        return new Promise((resolve, reject) => {
            if (!unit.normalAssetModel)
                resolve(unit)
            else {
                this.createCardAsset(unit.normalAssetModel)
                .then(normalCardAsset => {
                    if (!normalCardAsset) console.log("FACTORY:", normalCardAsset)
                    unit._normalCardAsset = normalCardAsset
                    resolve(unit)
                })
                .catch(err => reject(err))
            }
        })
    }
    bindRankMaxAsset(unit) {
        return new Promise((resolve, reject) => {
            if (!unit.rankMaxAssetModel)
                resolve(unit)
            else {
                this.createCardAsset(unit.rankMaxAssetModel)
                .then(rankMaxCardAsset => {
                    unit._rankMaxCardAsset = rankMaxCardAsset
                    resolve(unit)
                })
                .catch(err => reject(err))
            }
        })
    }
    createAllUnits() {
        return new Promise((resolve, reject) => {
            model.UnitModel.findAll({
                where: {
                    unit_number: {
                        $ne: 0
                    }
                },
                include: [
                    {
                        model: model.UnitNaviAssetModel,
                        as: 'normal_unit_navi_asset'
                    },
                    {
                        model: model.UnitNaviAssetModel,
                        as: 'rank_max_unit_navi_asset'
                    },
                    {
                        model: model.UnitTypeModel,
                        as: "unit_type"
                    }
                ]
            })
            .map(unitModel => {
                return this.createUnitWithModel(unitModel)
            })
            .then(units => resolve(units))
            .catch(err => reject(err))
        })
    }

    createAllPairs() {
        return new Promise((resolve, reject) => {
            model.UnitPairModel.findAll({
                where: {
                    "unit_id": {
                        $ne: 99999
                    }
                },
                include: [
                    { model: model.UnitModel,
                        as: 'unit',
                        include: [
                            { model: model.UnitNaviAssetModel,
                                as: 'normal_unit_navi_asset' },
                            { model: model.UnitNaviAssetModel,
                                as: 'rank_max_unit_navi_asset' },
                            { model: model.UnitTypeModel,
                                as: "unit_type" } ]
                    }
                ]
            })
            .then(pairModels => {
                let groupsObject = _.groupBy(pairModels, pairModel => pairModel["pair"])
                groupsObject = _.filter(groupsObject, (pair) => pair.length === 2)
                groupsObject = _.filter(groupsObject, (pair) => pair[0].unit && pair[1].unit)
                return _.map(groupsObject, (pair) => new Pair(pair))
            })
            .map(pair => new Promise((resolve, reject) =>
                Promise.all([
                    this.bindUnitOfPosition(pair, 0),
                    this.bindUnitOfPosition(pair, 1)
                ])
                .then(() => resolve(pair)))
                .catch(err => reject(err))
            )
            .filter(pair => {
                return pair.units[0].unitModel['unit_number'] !== 0
                && pair.units[1].unitModel['unit_number'] !== 0
            })
            .then(pairs => resolve(pairs))
            .catch(err => reject(err))
        })
    }

    bindUnitOfPosition(pair, position) {
        return new Promise((resolve, reject) => {
            let unitModel = pair.getUnitModelOfPosition(position)
            this.createUnitWithModel(unitModel, pair.rankedMax)
            .then(unit => {
                pair.setUnitOfPosition(position, unit)
                resolve(unit)
            }).catch(err => reject(err))
        })
    }
}

module.exports = UnitFactory