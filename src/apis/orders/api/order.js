const orderService = require('../service/helper')

module.exports.order = async  (req, res) => {
	try {
		const response = await orderService.addNewOrder(req.body);
        return 	response;
	} catch (err) {
		console.log(err);
	}
};