const orderService = require('../service/helper')

module.exports.order = async  (req, res) => {
	try {
		const response = await orderService.addNewOrder(req.body, res);
        return 	response;
	} catch (err) {
		console.log(err);
	}
};

module.exports.orderCount = async  (req, res) => {
	try {
		const response = await orderService.getOrderCount();
        return 	{orderCount : response};
	} catch (err) {
		console.log(err);
	}
};