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
export const reqValidAndDefault = (data, defaultIdx) => { // 값이 존재하는 지 검증하고 데이터를 반환 ( 존재: 1, null || undefined: 2)
  return parseInt(data) >= 1 
          ? parseInt(data)
          : defaultIdx;
};


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
    const limit = reqValidAndDefault(req.query.limit, 15);
    const page = reqValidAndDefault(req.query.page, 1);
    const offset = limit * (page - 1);

    const posts = await schema.findAll({
      include: [{
        model: Inquiry,
        attributes: ['count'],
      }],
      offset,
      limit,
      order: [['id', 'DESC']],
    });

    const allPageIdx = await schema.findAll({
      attributes: ['id'],
    });

    return res.status(200).json({
      postsList: posts,
      total: Math.floor(allPageIdx.length / limit),
    });
  } catch (err) {
    console.log('/board GET Error');
    console.error(err);
    res.status(404).send('데이터를 찾을 수 없습니다.');
    next(err);
  }
}
