import sequelize from '../../models';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
// import url from 'url';

const { Image } = sequelize;

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
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

/*
  Controllers
    DB와 로직을 수행하는 함수(Controller)
*/
const postBoard = (req, res, next) => async schema => { // 자격증 취득 게시글 작성
  try {
    const { title, paragraph } = req.body;
    const { user } = req;
    const { files } = req;
    console.log(files);

    const redirectUrl = req.originalUrl.match(/[a-z]+\/[a-z]+/g);
    // if (!user) {
    //   return res.redirect(url.format({
    //     pathname: '/',
    //     query: {
    //       'error': 'please-login'
    //     },
    //   }));
    // }

    if (!title) {
      return res.redirect(...redirectUrl);
    }


    // FIX: 개발 보류
    if (req.files) {
      await Promise.all(
        req.files.map(file => Image.create({ src: file.filename }))
      );
    }
    
    await schema.create({
      title,
      content: paragraph,
      UserId: user,
    });

    return res.redirect(...redirectUrl);

  } catch(err) {
    console.log('acquisitionPost Error');
    console.error(err);
    next(err);
  }
};


export default postBoard;