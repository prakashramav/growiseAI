const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addTransaction = async (req, res) => {
  const { title, amount, type, category, paymentMode, notes, date } = req.body;

  try {
    const newTransaction = new Transaction({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      paymentMode,
      notes,
      date: date || Date.now(),
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTransaction = async (req, res) => {
  const { title, amount, type, category, paymentMode, notes, date } = req.body;

  // Build transaction object
  const transactionFields = {};
  if (title) transactionFields.title = title;
  if (amount) transactionFields.amount = amount;
  if (type) transactionFields.type = type;
  if (category) transactionFields.category = category;
  if (paymentMode) transactionFields.paymentMode = paymentMode;
  if (notes) transactionFields.notes = notes;
  if (date) transactionFields.date = date;

  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: transactionFields },
      { new: true }
    );

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ message: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
