"use strict";
const Illness = require("../../diseases/models/illness")
const BasketItem = require("./basketItem")
const { Sequelize, DataTypes } = require('sequelize');
const database = require('../../../config/database');

const IllnessItem = database.config.define(
    "illness_item",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: 'id',
        },
        illness_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'illness_id',
            references: {
                model: Illness, 
                key: 'id', 
            }
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'item_id',
            references: {
                model: BasketItem, 
                key: 'item_id',
            }
        }
    },
    { timestamps: true }
);

IllnessItem.belongsTo(Illness,{
    foreignKey:"illness_id",
    targetKey:"id",
    as:"illness"
})

IllnessItem.belongsTo(BasketItem,{
    foreignKey:"item_id",
    targetKey:"item_id",
    as:"basket_items"
})
IllnessItem.sync().then();

module.exports = IllnessItem;