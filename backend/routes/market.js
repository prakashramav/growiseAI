const express = require('express');
const router = express.Router();
const { getLiveMarketData } = require('../controllers/marketController');

// Using a public endpoint (no auth) so the ticker can easily poll it
router.get('/live', getLiveMarketData);

module.exports = router;
