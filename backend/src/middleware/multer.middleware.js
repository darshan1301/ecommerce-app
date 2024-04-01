// const multer = require("multer");
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    req.fileValidationError =
      "Invalid file type. Allowed types are JPEG, PNG, and GIF.";
    return cb(null, false);
  }

  // Check for file size limit
  const maxFileSize = 4 * 1024 * 1024; // 4MB
  if (file.size > maxFileSize) {
    req.fileValidationError =
      "File size is too large. Maximum size allowed is 4MB.";
    return cb(null, false);
  }

  cb(null, true); // File is accepted
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB limit
  },
  fileFilter: fileFilter,
});
