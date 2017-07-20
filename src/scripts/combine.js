const _ = require('lodash')

function combine(options) {
    return _.map(
        _.reduce(_.values(options), (results, propVals) => {
            return _.flatten(_.map(results, result => _.map(propVals, prop => _.flatten([result, prop]))))
        }),
        props => _.zipObject(_.keys(options), props)
    )
}

module.exports = combine