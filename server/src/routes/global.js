import sequelize from '../models';
const { Notice, Community, Award, Certpost, Portfolio } = sequelize;

const globalRouter = require('express').Router();

globalRouter.get('/', (req, res) => {
  res.render('import/index', { title: 'hello' });
});

globalRouter.get('/announcement', async (req, res, next) => {
  try {
    const posts = await Notice.findAll({
      limit: 10,
      attributes: ['title', 'updatedAt'],
    });

    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

globalRouter.get('/community', async (req, res, next) => {
  try {
    const posts = await Community.findAll({
      limit: 10,
      attributes: ['title', 'updatedAt'],
    });

    if (posts[0] === undefined) {
      return res.status(404).send('데이터가 존재하지 않습니다.');
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

globalRouter.get('/club', async (req, res, next) => {
  try {
    // 차 후 작성
  } catch (err) {
    console.error(err);
    next(err);
  }
});

globalRouter.get('/campuslive', async (req, res, next) => {
  try {
    const certPost = await Certpost.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      attributes: ['title', 'updatedAt'],
    });
    const awardPost = await Award.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      attributes: ['title', 'updatedAt'],
    });
    const portfolioPost = await Portfolio.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      attributes: ['title', 'updatedAt'],
    });
    const posts = [].concat(certPost).concat(awardPost).concat(portfolioPost);

    if (posts[0] === undefined) {
      return res.status(404).send('데이터가 존재하지 않습니다.');
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default globalRouter;
