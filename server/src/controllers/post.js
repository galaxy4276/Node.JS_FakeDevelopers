import sequelize from '../models';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import url from 'url';

const { Certpost, Image, Inquiry } = sequelize;

/* 
  Function for Controllers
    부속 함수들...
*/
const isEmpty = params => {
  return Object.keys(params).length === 0;
}

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
export const acquisitionPost = async (req, res, next) => { // 자격증 취득 게시글 작성 
  try {
    const { title, paragraph } = req.body;
    const { user } = req;
    const { file } = req;

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
    if (req.file) {
      await Image.create({
        src: file.filename,
      });
    }
    
    await Certpost.create({
      title,
      content: paragraph,
      UserId: user,
    });

    return res.redirect('/footprint/acquisition');

  } catch(err) {
    console.log('acquisitionPost Error');
    console.error(err);
    next(err);
  }
};

export const getPostsList = (req, res, next) => async (schema) => { // 스키마를 인자로 받아 limit&page 에 해당하는 json 데이터를 반환
  try {
    if (!isEmpty(req.query)) {
      const limit = parseInt(req.query?.limit);
      const page = parseInt(req.query?.page);

      if ( !limit || !page ) {
        return res.status(302).send('limit 과 page를 url query로 주어야 합니다.');
      }
    
      if (limit && page) {
        const offset = limit * (page - 1);
        console.log(`offset: ${offset}`);

        const posts = await schema.findAll({
          include: [{
            model: Inquiry,
            attributes: ['count'],
          }],
          offset,
          limit,
        });

        return res.json(posts);
      }
    }
  } catch (err) {
    console.log('/board GET Error');
    console.error(err);
    next(err);
  };
}