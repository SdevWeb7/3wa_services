import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const newDirectory = path.join(
         process.cwd(),
         "public/img/id_" + req.body.title
      );
      fs.mkdirSync(newDirectory, { recursive: true });
      cb(null, newDirectory);
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
   },
});


export const upload = multer({
   storage,
   limits: {
      fileSize: 5 * 1024 * 1024,
   },
   fileFilter: function (req, file, cb) {
      const filetypes = /png|jpg|jpeg/;
      const isExtnameValid = filetypes.test(
         path.extname(file.originalname).toLowerCase()
      );

      const isMimetypeValid = filetypes.test(file.mimetype);

      if (isMimetypeValid && isExtnameValid) {
         return cb(null, true);
      } else {
         cb("Images en png, jpg ou jpeg uniquement");
      }
   },
}).array("images", 10);