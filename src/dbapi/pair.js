const _ = require("lodash")

const properties = require("../value/properties")

class Pair {
    constructor(pair) {
        if (pair[0].pair !== pair[1].pair) throw Error("Wrong pair")
        this._pairId = pair[0].pair
        this._pairModels = _.sortBy(pair, item => item["position"])
        this._units = [null, null]
        //this._rankedMax = false
    }

    get pairId() { return this._pairId }

    /* model */
    get pairModels() { return this._pairModels }
    get leftPairModel() { return this.pairModels[properties.pairPosition.LEFT] }
    get rightPairModel() { return this.pairModels[properties.pairPosition.RIGHT] }
    getPairModelOfPosition(position) { return this.pairModels[position] }
    getUnitModelOfPosition(position) { return this.getPairModelOfPosition(position)["unit"] }

    /* unit and cards */
    get units() { return this._units }
    get leftUnit() { return this.units[properties.pairPosition.LEFT] }
    get rightUnit() { return this.units[properties.pairPosition.RIGHT] }
    getUnitOfPosition(position) { return this.units[position] }
    setUnitOfPosition(position, value) { this.units[position] = value }

    /* rankMax */
    get rankedMax() {
        if (this.leftPairModel.rank !== this.rightPairModel.rank) throw Error("Wrong pair rank.")
        return this.leftPairModel.rank - 1 ? true : false
    }
    /*
    get rankedMax() { return this._rankedMax }
    set rankedMax(value) {
        this._rankedMax = value ? true : false
        _.each(this.units, unit => {
            if (unit) unit.rankedMax = this.rankedMax
        })
    }
    */
}
module.exports = Pair