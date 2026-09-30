const multer = require('multer');
const path = require('path');
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../..', UPLOAD_DIR)),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '')),
});

const upload = multer({ storage });
module.exports = upload;
