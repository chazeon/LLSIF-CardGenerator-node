const Sequelize = require("sequelize")
const path = require("path")

const config = require("../config")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(config.dir.external, "db/unit/unit.db_"),
    logging: false
})

const UnitModel = sequelize.define("unit_m", {
    unit_id:                    { type: Sequelize.INTEGER, primaryKey: true },
    unit_number:                Sequelize.INTEGER,
    unit_type_id:               Sequelize.INTEGER,
    eponym:                     Sequelize.STRING,
    name:                       Sequelize.STRING,
    normal_card_id:             Sequelize.INTEGER,
    rank_max_card_id:           Sequelize.INTEGER,
    normal_icon_asset:          Sequelize.STRING,
    rank_max_icon_asset:        Sequelize.STRING,
    normal_unit_navi_asset_id:  Sequelize.INTEGER,
    rank_max_unit_navi_asset_id:
                                Sequelize.INTEGER,
    rarity:                     Sequelize.INTEGER,
    attribute_id:               Sequelize.INTEGER,
    default_unit_skill_id:      Sequelize.INTEGER,
    skill_asset_voice_id:       Sequelize.INTEGER,
    default_leader_skill_id:    Sequelize.INTEGER,
    before_love_max:            Sequelize.INTEGER,
    after_love_max:             Sequelize.INTEGER,
    before_level_max:           Sequelize.INTEGER,
    after_level_max:            Sequelize.INTEGER,
    default_removable_skill_capacity:
                                Sequelize.INTEGER,
    max_removable_skill_capacity:
                                Sequelize.INTEGER,
    disable_rank_up:            Sequelize.INTEGER,
    unit_level_up_pattern_id:   Sequelize.INTEGER,
    hp_max:                     Sequelize.INTEGER,
    smile_max:                  Sequelize.INTEGER,
    pure_max:                   Sequelize.INTEGER,
    cool_max:                   Sequelize.INTEGER,
    rank_up_cost:               Sequelize.INTEGER,
    exchange_point_rank_up_cost:
                                Sequelize.INTEGER,
},
{
    freezeTableName: true,
    timestamps: false
})


const UnitNaviAssetModel = sequelize.define("unit_navi_asset_m", {
    unit_navi_asset_id: { type: Sequelize.INTEGER, primaryKey: true },
    unit_navi_asset:    Sequelize.STRING
},
{
    freezeTableName: true,
    timestamps: false
})

const UnitPairModel = sequelize.define("unit_pair_m", {
    unit_pair_id:   { type: Sequelize.INTEGER, primaryKey: true },
    pair:           Sequelize.INTEGER,
    unit_id:        Sequelize.INTEGER,
    position:       Sequelize.INTEGER,
    rank:           Sequelize.INTEGER
},
{
    freezeTableName: true,
    timestamps: false
})

const UnitTypeModel = sequelize.define("unit_type_m", {
    unit_type_id: { type: Sequelize.INTEGER, primaryKey: true },
    name: Sequelize.STRING,
    asset_background_id: Sequelize.INTEGER,
    image_button_asset: Sequelize.STRING,
    image_button_push_asset: Sequelize.STRING,
    background_color: Sequelize.STRING,
    name_image_asset: Sequelize.STRING,
    age: Sequelize.STRING,
    birthday: Sequelize.STRING,
    school: Sequelize.STRING,
    hobby: Sequelize.STRING,
    blood_type: Sequelize.STRING,
    height: Sequelize.STRING,
    three_size: Sequelize.STRING,
    member_category: Sequelize.INTEGER,
    number_suffix: Sequelize.STRING,
    cv: Sequelize.STRING
},
{
    freezeTableName: true,
    timestamps: false
})

/*
UnitModel.hasOne(UnitNaviAssetModel, {
    sourceKey: "normal_unit_navi_asset_id",
    foreignKey: "unit_navi_asset_id",
    //foreignKey: "normal_unit_navi_asset_id",
    as: "normal_unit_navi_asset"
})

UnitModel.hasOne(UnitNaviAssetModel, {
    sourceKey: "rank_max_unit_navi_asset_id",
    foreignKey: "unit_navi_asset_id",
    as: "rank_max_unit_navi_asset"
})
*/

UnitModel.belongsTo(UnitNaviAssetModel, {
    foreignKey: "rank_max_unit_navi_asset_id",
    targetKey: "unit_navi_asset_id",
    as: "rank_max_unit_navi_asset"
})

UnitModel.belongsTo(UnitNaviAssetModel, {
    foreignKey: "normal_unit_navi_asset_id",
    targetKey: "unit_navi_asset_id",
    as: "normal_unit_navi_asset"
})

UnitModel.belongsTo(UnitTypeModel, {
    foreignKey: "unit_type_id",
    targetKey: "unit_type_id",
    as: "unit_type"
})

UnitPairModel.belongsTo(UnitModel, {
    foreignKey: "unit_id",
    targetKey: "unit_id",
    as: "unit"
})

module.exports = {
    UnitModel,
    UnitNaviAssetModel,
    UnitPairModel,
    UnitTypeModel
}