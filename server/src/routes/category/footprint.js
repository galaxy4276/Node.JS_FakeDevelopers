import { acquisitionPost, uploads } from '../../controllers/post';
import sequelize from '../../models';
const { Certpost } = sequelize;


const footprint = require('express').Router();


footprint.get('/acquisition', async (req, res) => {
  const posts = await Certpost.findAll({
    attributes: ['title', 'content', 'createdAt', 'UserId'],
  });
  console.log(posts);
  res.render('import/footprint/acquisition', { posts });
});

footprint.post('/acquisition/post', uploads.single('file'), acquisitionPost);

footprint.get('/acquisition/post', async (req, res, next) => {

  res.render('import/footprint/post.pug');
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
