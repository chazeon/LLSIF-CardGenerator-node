const Sequelize = require("sequelize")
const path = require("path")

const config = require("../config")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(config.dir.external, "db/unit/card.db_"),
    logging: false
})

const CardModel = sequelize.define('card_m', {
    card_id:            { type: Sequelize.INTEGER, primaryKey: true },
    card_base_id:       Sequelize.INTEGER,
    unit_navi_asset_id: Sequelize.INTEGER,
    navi_layer_order:   Sequelize.INTEGER,
    navi_rotation:      Sequelize.INTEGER,
    navi_move_x:        Sequelize.INTEGER,
    navi_move_y:        Sequelize.INTEGER,
    navi_size_ratio:    Sequelize.REAL,
    flash_asset:        Sequelize.STRING
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = {
    CardModel
}