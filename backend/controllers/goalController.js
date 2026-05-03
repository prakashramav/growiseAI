const Goal = require('../models/Goal');

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addGoal = async (req, res) => {
  const { title, targetAmount, savedAmount, deadline } = req.body;

  try {
    const newGoal = new Goal({
      user: req.user.id,
      title,
      targetAmount,
      savedAmount: savedAmount || 0,
      deadline,
    });

    const goal = await newGoal.save();
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateGoal = async (req, res) => {
  const { title, targetAmount, savedAmount, deadline } = req.body;

  const goalFields = {};
  if (title) goalFields.title = title;
  if (targetAmount) goalFields.targetAmount = targetAmount;
  if (savedAmount !== undefined) goalFields.savedAmount = savedAmount;
  if (deadline) goalFields.deadline = deadline;

  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: goalFields },
      { new: true }
    );

    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Goal.findByIdAndDelete(req.params.id);

    res.json({ message: 'Goal removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
