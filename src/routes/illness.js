const router = require('express').Router()
const diseases = require('../apis/diseases/api/illness');

router.get('/illness', getAllDisease)

async function getAllDisease(req, res) {
    try {
        const diseasesInfo = await diseases.getAllDiseaseName(req, res);
        console.log(`diseasesInfo ${JSON.stringify(diseasesInfo)}`);
        return diseasesInfo;
    } catch (error) {
        console.log(error);
    }
}
module.exports = router;