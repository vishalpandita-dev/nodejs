const illness = require('../dao/illness');
const errorhandle = require('../../../config/dberrorHandle');

const getIllnessNames = async function getIllnessNames() {
    try {
        const illnessNames = await illness.getAllIllness();
        return illnessNames;
    } catch (e) {
        console.log(JSON.stringify({event: 'illness', method: 'getIllnessNames', error: e.stack}));
        const errorResponse = errorhandle.handleDbError(e);
        return errorResponse;
    }
};

module.exports = {
    getIllnessNames
}