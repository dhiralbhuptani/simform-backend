const path = require('path');
const multer = require('multer');

/** 
 * 
 * Middleware for uploading files
 * 
 */ 
const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, req.userId + '_' + file.fieldname + path.extname(file.originalname));
  },
});

/** 
 * 
 * Middleware for checking file types
 * 
 */
exports.imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png, jpg or jpeg format
      return cb(new Error("Please upload valid Image file."));
    }

    cb(undefined, true);
  },
});
