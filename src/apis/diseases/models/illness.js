const Sequelize = require('sequelize');
const database = require('../../../config/database');

const illness = database.config.define('illness', {
    id: {
		type: Sequelize.INTEGER(10),
		autoIncrement: true,
		primaryKey: true,
		field: 'id'
	},
    illness_name: {
		type: Sequelize.STRING(50),
		allowNull: false,
		field: 'illness_name'
	},

}, { timestamps: false });

illness.sync().then();

module.exports = illness;