require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ------- Connect Mongo -------
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/polar-portal';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// ------- Import & use routes -------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expeditions', require('./routes/expeditions'));
app.use('/api/datasets', require('./routes/datasets'));
app.use('/api/publications', require('./routes/publications'));
app.use('/api/media', require('./routes/media'));
app.use('/api/activities', require('./routes/activities'));

app.get('/', (req, res) => res.send('Polar Science Portal API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
