const multer = require('multer');
const path = require('path');

// CLASSIFY FILE TYPE
const FILE_TYPE_MAP = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png',
};

// CONFIG UPLOAD STORAGE
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let isValidType = FILE_TYPE_MAP[file.mimetype],
      uploadError = null;

    if (!isValidType) uploadError = new Error('Invalid file type.');

    cb(uploadError, './public/uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(' ', ''),
      extName = FILE_TYPE_MAP[file.mimetype],
      fileUrl = `${fileName}-${Date.now()}.${extName}`;

    cb(null, fileUrl);
  },
});

const upload = multer({ storage: fileStorage });

// UTILITIES FUNCTIONS
function createFilePath(req, file) {
  if (!req || !file || !file.path) return '';

  return `${req.protocol}://${req.get('host')}/${file.path}`;
}

module.exports = { upload, createFilePath };
