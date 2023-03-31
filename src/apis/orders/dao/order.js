const order = require('../models/order');
const orderItems = require('../models/orderItems');

async function placeOrder(orderData, transaction) {
	try {	
		let result = await order.create(orderData, {transaction:transaction});
		return result;
	} catch (error) {
		throw error;
	}
}

async function addOrderItems(data, transaction) {
	try {	
		let result = await orderItems.bulkCreate(data,{transaction:transaction});
		return result;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	placeOrder,
	addOrderItems
}