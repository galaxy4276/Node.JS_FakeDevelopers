import sequelize from '../models';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import url from 'url';

const { Certpost } = sequelize;

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
  const { title, content } = req.body;
  const { user } = req;
  const { file } = req;

  try {
    console.log(file);
    console.log(req.files);

    if (!user) {
      return res.redirect(url.format({
        pathname: '/',
        query: {
          'error': 'please-login'
        },
      }));
    }

    if (!title) {
      return res.redirect('/footprint/acquisition');
    }
    
    await Certpost.create({
      title,
      content,
      UserId: user,
    });

  } catch(err) {
    console.log('acquisitionPost Error');
    console.error(err);
    next(err);
  }
};