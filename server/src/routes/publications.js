const express = require('express');
const Publication = require('../models/Publication');
const authRequired = require('./authRequired');
const upload = require('./upload');

const router = express.Router();

// Public: list publications
router.get('/', async (req, res) => {
  const pubs = await Publication.find().sort('-publishedOn');
  res.json(pubs);
});

// Public: get one
router.get('/:id', async (req, res) => {
  const pub = await Publication.findById(req.params.id);
  res.json(pub);
});

// Admin: create (upload PDF)
router.post('/', authRequired, upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, authors, journal, abstract, publishedOn, tags } = req.body;
    const pub = new Publication({
      title, authors: authors ? authors.split(',').map(a => a.trim()) : [],
      abstract, journal, publishedOn,
      pdfUrl: req.file?.path,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
    });
    await pub.save();
    res.json(pub);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Admin: update
router.put('/:id', authRequired, async (req, res) => {
  const updated = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin: delete
router.delete('/:id', authRequired, async (req, res) => {
  await Publication.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
