const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

router.get('/', auth, getGoals);
router.post('/', auth, addGoal);
router.put('/:id', auth, updateGoal);
router.delete('/:id', auth, deleteGoal);

module.exports = router;
