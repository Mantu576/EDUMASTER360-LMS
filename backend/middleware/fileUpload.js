const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists or create it
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
  }
});

// File filter for allowed types (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5 MB size limit
});

module.exports = upload;
