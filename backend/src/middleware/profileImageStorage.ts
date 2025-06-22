import multer from "multer";
import path from "path";

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/profile-images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const profileUpload = multer({ storage: profileStorage });

export default profileUpload;