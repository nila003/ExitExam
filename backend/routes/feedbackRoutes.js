const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// 1. Get All Feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching feedback' });
  }
});

// 2. Add New Feedback
router.post('/', async (req, res) => {
  const { courseName, comments, rating, courseDuration } = req.body;

  if (!courseName || !comments || !rating || !courseDuration) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newFeedback = new Feedback({ courseName, comments, rating, courseDuration });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback added successfully', feedback: newFeedback });
  } catch (err) {
    res.status(500).json({ error: 'Error adding feedback' });
  }
});

// 3. Update Feedback
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { courseName, comments, rating, courseDuration } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { courseName, comments, rating, courseDuration },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (err) {
    res.status(500).json({ error: 'Error updating feedback' });
  }
});

// 4. Delete Feedback
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting feedback' });
  }
});

module.exports = router;
