const express = require('express');
const Expedition = require('../models/Expedition');
const authRequired = require('./authRequired');
const upload = require('./upload');

const router = express.Router();

// Public: list expeditions
router.get('/', async (req, res) => {
  const expeditions = await Expedition.find().sort('-date');
  res.json(expeditions);
});

// Public: get one
router.get('/:id', async (req, res) => {
  const exp = await Expedition.findById(req.params.id);
  res.json(exp);
});

// Admin: create (upload files)
router.post('/', authRequired, upload.fields([
  { name: 'reportFile', maxCount: 1 },
  { name: 'photos', maxCount: 10 },
  { name: 'videos', maxCount: 5 },
]), async (req, res) => {
  try {
    const { title, description, date, tags } = req.body;
    const exp = new Expedition({
      title, description, date,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      reportFile: req.files['reportFile']?.[0]?.path,
      photos: (req.files['photos']||[]).map(f => f.path),
      videos: (req.files['videos']||[]).map(f => f.path),
    });
    await exp.save();
    res.json(exp);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Admin: update
router.put('/:id', authRequired, async (req, res) => {
  const updated = await Expedition.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin: delete
router.delete('/:id', authRequired, async (req, res) => {
  await Expedition.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
