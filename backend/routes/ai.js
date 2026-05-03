const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { chat, categorize, summary, investmentAdvice } = require('../controllers/aiController');

router.post('/chat', auth, chat);
router.post('/categorize', auth, categorize);
router.get('/summary', auth, summary);
router.get('/investment-advice', auth, investmentAdvice);

module.exports = router;
