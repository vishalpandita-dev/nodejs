const orderDao = require('../dao/order');
const errorhandle = require('../../../config/dberrorHandle');
const database = require('../../../config/database');
const basketItems = require('../../basketItems/dao/basketItems');
const illness = require('../../diseases/dao/illness');
const moment = require('moment');

function orderPayload(body) {
	const payload = {
		name: body.name,
		gender: body.gender,
		weight: body.weight,
		date_of_birth: body.dateOfBirth,
		guardian_name: body.guardianName,
		relation: body.relation,
		type_of_illness: body.typeOfIllness,
		illness_since: body.illnessSince,
		symptoms: body.symptoms,
		allergies: body.allergies,
		medication: body.medication,
		phone_number: body.phoneNo,
		email: body.email,
		delivery_address: body.deliveryAddress,
		deivery_date: body.deliveryDate,
		latitude: body.latitude,
		logitude: body.logitude,
		city: body.city,
		state: body.state,
		postcode: body.postCode
	};
	return payload;
}

const addNewOrder = async function addNewOrder(body) {
    try {
        const orderPayloadData = orderPayload(body);
		const illnessId = await illness.getIllnessByName(body.typeOfIllness);

		const dateOfBirth = body.dateOfBirth;
		const birthDate = moment(dateOfBirth);
		const age = moment().diff(birthDate, 'years');

		const ageGroup = checkNumberRange(age);
		const basketItemsData = await basketItems.getBasketItems(illnessId.id, ageGroup);
		console.log(JSON.stringify(basketItemsData));

		if(basketItemsData.length === 0){
			return "No gift item applicable";
		}
		let orderData = {};
		await database.config.transaction(async (t) => {
            orderData = await orderDao.placeOrder(orderPayloadData, t);
			console.log(JSON.stringify(orderData));
			let allbasketItems = [];
			let basketItemsInfo = [];
            basketItemsData.map(basketItemData => {
				allbasketItems.push({order_id: orderData.id, item_id: basketItemData.basket_items.item_id});
				basketItemsInfo.push(basketItemData.basket_items.item_name);
			});
			console.log(basketItemsInfo);
			await orderDao.addOrderItems(allbasketItems, t); 
			orderData = {
				...orderData.dataValues,
				basketItems: basketItemsInfo
			};
        });
        return orderData;
    } catch (e) {
        console.log(JSON.stringify({event: 'order', method: 'addNewOrder', error: e.stack}));
        const errorResponse = errorhandle.handleDbError(e);
        return errorResponse;
    }
};

function checkNumberRange(number) {
	switch (true) {
	  case (number >= 1 && number <= 5):
		return "0-5";
	  case (number >= 6 && number <= 10):
		return "6-10";
	  case (number > 11):
		return "11-16";
	  default:
		console.log("Age not valid");
		break;
	}
}
module.exports = {
    addNewOrder
}