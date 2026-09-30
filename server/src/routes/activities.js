const express = require('express');
const InstitutionalActivity = require('../models/InstitutionalActivity');
const authRequired = require('./authRequired');
const upload = require('./upload');

const router = express.Router();

// Public: list activities
router.get('/', async (req, res) => {
  const acts = await InstitutionalActivity.find().sort('-date');
  res.json(acts);
});

// Public: get one
router.get('/:id', async (req, res) => {
  const act = await InstitutionalActivity.findById(req.params.id);
  res.json(act);
});

// Admin: create (upload attachments)
router.post('/', authRequired, upload.array('attachments', 5), async (req, res) => {
  try {
    const { title, description, date, category } = req.body;
    const act = new InstitutionalActivity({
      title, description, date, category,
      attachments: (req.files||[]).map(f => f.filename)
    });
    await act.save();
    res.json(act);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Admin: update
router.put('/:id', authRequired, async (req, res) => {
  const updated = await InstitutionalActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin: delete
router.delete('/:id', authRequired, async (req, res) => {
  await InstitutionalActivity.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
