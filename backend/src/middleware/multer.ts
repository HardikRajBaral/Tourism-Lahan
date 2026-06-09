import multer from "multer";
import { logger } from "../lib/logger";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else {
        logger.error("Invalid file type");
      return cb(new Error("Invalid file type"));
    }
  },
});

export default upload;
