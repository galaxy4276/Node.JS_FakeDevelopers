import sequelize from '../../models';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
// import url from 'url';

const { Image, Inquiry } = sequelize;

export const uploads = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
    if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      } 
      cb(null, 'uploads');
    },
    filename(req, file, cb) {
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname);
      cb(null, basename + '_' + new Date().getTime() + extname);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

/*
  Controllers
    DB와 로직을 수행하는 함수(Controller)
*/
const postBoard = (req, res, next) => {
  const { title, paragraph } = req.body;

  console.log(req.files);

  const UserId = req.user.id || 'Anonymous';
  const redirectUrl = '/' + req.originalUrl
    .match(/[a-z]+\/[a-z]+/g)
    .join('');

  if (!title) {
    return res.redirect(redirectUrl);
  }

  req.files.map((image, i) => {
    if (!image.mimetype.includes('image')) {
      throw Error('확장자가 이미지가 아닙니다.');
    }
  });

  return async schema => {
    try {
      const post = await schema.create({
        title,
        content: paragraph,
        UserId,
      });

      const inquiry = await Inquiry.create({});
      await post.addInquiry(inquiry);
      // FIX: 개발 보류
      if (Array.isArray(req.files) && req.files.length > 1) {
        const images = await Promise.all(
          req.files.map(file => Image.create({src: file.filename}))
        );

        await post.addImages(images);
      }

      if (req.files.length === 1) {
        const image = await Image.create({src: req.files[0].filename});
        await post.addImages(image);
      }

      return res.redirect(redirectUrl);
    } catch (err) {
      console.log('acquisitionPost Error');
      console.error(err);
      next(err);
    }
  };
};


export default postBoard;