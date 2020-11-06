import sequelize from '../models';
const { Announcement, Community, Award, Certpost, Portfolio } = sequelize;


const globalRouter = require('express').Router();


globalRouter.get('/', (req, res) => {
  res.render('import/index', { title: 'hello' });
});

globalRouter.get('/announcement', async (req, res, next) => {
  try {
    const posts = await Announcement.findAll({
      limit: 10
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

globalRouter.get('/community', async (req, res, next) => {
  try {
    const posts = await Community.findAll({
      limit: 10
    });

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
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    const awardPost = await Award.findAll({
      limit: 1,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    const portfolioPost = await Portfolio.findAll({
      limit: 1,
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    const posts = [].concat(certPost).concat(awardPost).concat(portfolioPost);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


export default globalRouter;
