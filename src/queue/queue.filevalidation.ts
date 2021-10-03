export const fileValidator = (req, file, cb) => {
  if (!['text/csv', 'csv'].includes(file.mimetype)) {
    req.mimeTypeValidation = false;
    return cb(null, false);
  }
  req.mimeTypeValidation = true;
  return cb(null, true);
};
