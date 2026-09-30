require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS — allow all origins in dev, restrict in prod via env
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ------- Connect Mongo -------
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/polar-portal';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// ------- Routes -------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expeditions', require('./routes/expeditions'));
app.use('/api/datasets', require('./routes/datasets'));
app.use('/api/publications', require('./routes/publications'));
app.use('/api/media', require('./routes/media'));
app.use('/api/activities', require('./routes/activities'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/', (req, res) => res.send('Polar Science Portal API is running 🧊'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
