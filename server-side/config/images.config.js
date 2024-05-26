import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const newDirectory = path.join(
         process.cwd(),
         "public/img/"
      );
      fs.mkdirSync(newDirectory, { recursive: true });
      cb(null, newDirectory);
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});


export const upload = multer({
   storage,
   limits: {
      fileSize: 5 * 1024 * 1024,
   },
   fileFilter: function (req, file, cb) {
      const filetypes = /png|jpg|jpeg|webp|svg/;
      const isExtnameValid = filetypes.test(
         path.extname(file.originalname).toLowerCase()
      );

      const isMimetypeValid = filetypes.test(file.mimetype);

      if (isMimetypeValid && isExtnameValid) {
         return cb(null, true);
      } else {
         cb("Image en png, jpg, jpeg ou webp uniquement et maximum 5Mo");
      }
   },
}).single("image");