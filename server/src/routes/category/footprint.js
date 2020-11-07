import { acquisitionPost, uploads } from '../../controllers/post';
import sequelize from '../../models';
const { Certpost } = sequelize;


const footprint = require('express').Router();


footprint.get('/acquisition', (req, res) => {
  res.render('import/footprint/acquisition', {});
});

footprint.post('/acquisition/post', uploads.single('file'), acquisitionPost);

footprint.get('/acquisition/post', async (req, res, next) => {
  const posts = await Certpost.findAll({
    attributes: ['title', 'content', 'createdAt', 'UserId'],
  });

  res.render('import/footprint/post.pug', { posts });
});

footprint.get('/awards', (req, res) => {
  res.render('import/footprint/awards', {});
});

footprint.get('/acquisition/post', (req, res, next) => {
  res.render('import/footprint/post', {});
});

footprint.get('/portfolio', (req, res) => {
  res.render('import/footprint/portfolio', {});
});


export default footprint;
