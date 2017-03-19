const abstractViews = require("../abstract").view
const JoinPairMixin = require("./mixin").JoinPairMixin
const MergeLayersMixin = require("./mixin").MergeLayersMixin

class SharpCardView extends MergeLayersMixin(abstractViews.CardView) {}
class SharpIconView extends MergeLayersMixin(abstractViews.IconView) {}
class SharpPairView extends JoinPairMixin(abstractViews.PairView) {}

module.exports = {
    SharpCardView,
    SharpIconView,
    SharpPairView
}