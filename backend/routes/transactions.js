const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');

// @route   GET api/transactions
// @desc    Get all users transactions
// @access  Private
router.get('/', auth, getTransactions);

// @route   POST api/transactions
// @desc    Add new transaction
// @access  Private
router.post('/', auth, addTransaction);

// @route   PUT api/transactions/:id
// @desc    Update transaction
// @access  Private
router.put('/:id', auth, updateTransaction);

// @route   DELETE api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', auth, deleteTransaction);

module.exports = router;
