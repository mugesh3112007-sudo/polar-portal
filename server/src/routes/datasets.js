const express = require('express');
const Dataset = require('../models/Dataset');
const authRequired = require('./authRequired');
const upload = require('./upload');

const router = express.Router();

// Public: list datasets
router.get('/', async (req, res) => {
  const sets = await Dataset.find().sort('-publishedOn');
  res.json(sets);
});

// Public: get one
router.get('/:id', async (req, res) => {
  const set = await Dataset.findById(req.params.id);
  res.json(set);
});

// Admin: create (upload file)
router.post('/', authRequired, upload.single('datasetFile'), async (req, res) => {
  try {
    const { title, description, publishedOn, metadata, tags } = req.body;
    const set = new Dataset({
      title, description, publishedOn,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      datasetFile: req.file?.filename,
      metadata: metadata ? JSON.parse(metadata) : {},
    });
    await set.save();
    res.json(set);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Admin: update
router.put('/:id', authRequired, async (req, res) => {
  const updated = await Dataset.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin: delete
router.delete('/:id', authRequired, async (req, res) => {
  await Dataset.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
