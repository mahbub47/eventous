import multer from "multer";
import path from "path";

const eventCoverImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/event-covers"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const eventCoverUpload = multer({ storage: eventCoverImageStorage });

export default eventCoverUpload;