const express = require('express');
const router = express.Router();
const { getCampaigns, createCampaign, sendCampaign, deleteCampaign } = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getCampaigns).post(createCampaign);
router.route('/:id/send').put(sendCampaign);
router.route('/:id').delete(deleteCampaign);

module.exports = router;
