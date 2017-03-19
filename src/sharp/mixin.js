const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs"))

const mergeLayers = require("./layer")
const joinPair = require("./pair")

const MergeLayersMixin = BaseClass => class extends BaseClass {
    getBuffer() {
        return mergeLayers(this.layers)
    }
}

const JoinPairMixin = BaseClass => class extends BaseClass {
    getCardViewBuffers() {
        return new Promise((resolve, reject) => {
            this.leftCardView.getBuffer()
            .then(leftBuffer => {
                this.rightCardView.getBuffer()
                .then(rightBuffer => {
                    resolve([leftBuffer, rightBuffer])
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
    }
    getBuffer() {
        //return new Promise((resolve, reject) => {
            return this.getCardViewBuffers()
            .then(buffers => joinPair(buffers[0], buffers[1]))
            //.catch(err => reject(err))
        //})
    }
}

module.exports = {
    MergeLayersMixin,
    JoinPairMixin
}