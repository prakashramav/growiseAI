const Budget = require('../models/Budget');

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addBudget = async (req, res) => {
  const { category, limit, month } = req.body;

  try {
    let budget = await Budget.findOne({ user: req.user.id, category, month });

    if (budget) {
      // Update existing budget
      budget.limit = limit;
      await budget.save();
      return res.json(budget);
    }

    const newBudget = new Budget({
      user: req.user.id,
      category,
      limit,
      month,
    });

    budget = await newBudget.save();
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateBudget = async (req, res) => {
  const { limit } = req.body;

  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    budget = await Budget.findByIdAndUpdate(
      req.params.id,
      { $set: { limit } },
      { new: true }
    );

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.json({ message: 'Budget removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
