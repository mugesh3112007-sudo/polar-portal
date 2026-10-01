const express = require('express');
const Media = require('../models/Media');
const authRequired = require('./authRequired');
const upload = require('./upload');

const router = express.Router();

// Public: list all media
router.get('/', async (req, res) => {
  const media = await Media.find().sort('-createdAt');
  res.json(media);
});

// Public: get one
router.get('/:id', async (req, res) => {
  const med = await Media.findById(req.params.id);
  res.json(med);
});

// Admin: create (photo/video)
router.post('/', authRequired, upload.single('file'), async (req, res) => {
  try {
    const { type, caption, relatedExpeditions, tags } = req.body;
    const med = new Media({
      type,
      url: req.file?.path,
      caption,
      relatedExpeditions: relatedExpeditions ? relatedExpeditions.split(',').map(e => e.trim()) : [],
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    });
    await med.save();
    res.json(med);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Admin: update
router.put('/:id', authRequired, async (req, res) => {
  const updated = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin: delete
router.delete('/:id', authRequired, async (req, res) => {
  await Media.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
