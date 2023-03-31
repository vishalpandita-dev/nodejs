const illnessName = require('../service/helper')

module.exports.getAllIllnessName = async (event, context) => {
	try {	
		const response = await illnessName.getIllnessNames();
        return 	response;
	} catch (err) {
		console.log(err);
	}
};