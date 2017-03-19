const _ = require("lodash")

const ViewFactory = require("../abstract").factory
const sharpView = require("./view")

class SharpViewFactory extends ViewFactory {
    createCardView(unit, options) {
        return new sharpView.SharpCardView(unit, options)
    }
    createIconView(unit, options) {
        return new sharpView.SharpIconView(unit, options)
    }
    createPairView(pair, options) {
        let cardViews = _.map(pair.units, unit => this.createCardView(unit, options))
        return new sharpView.SharpPairView(pair, cardViews)
    }
}

module.exports = SharpViewFactory