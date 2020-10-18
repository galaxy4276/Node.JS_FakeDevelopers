import sequelize from '../models';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const { Post } = sequelize;

export const uploads = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      if (!fs.accessSync('../uploads')) {
        fs.mkdirSync(path.join(__dirname, '../', 'uploads'));
      } 
      cb(null, 'uploads');
    },
    filename(req, file, cb) {
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname);
      cb(null, basename + '_' + new Date().getTime() + extname);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

export const acquisitionPost = async (req, res, next) => {
  const { title, image, content } = req.body;
  const { id } = req.user;

  try {
    await Post.create({
      title,
      image,
      content,
      UserId: id,
    });
  } catch(err) {
    console.log('acquisitionPost Error');
    console.error(err);
    next(err);
  }
};