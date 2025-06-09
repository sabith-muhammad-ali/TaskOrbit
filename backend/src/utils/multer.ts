import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";


const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

export const upload = multer({
  storage,
});

export default upload;
