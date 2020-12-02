import { acquisitionPost, uploads } from '../../controllers/post';
import sequelize from '../../models';
const { 
  Certpost,
  Award,
  Portfolio
 } = sequelize;
import { createBulkBoard } from '../../lib/createBulkData';
import { getPostsList } from '../../controllers/post';


const footprint = require('express').Router();

// 자격증 취득 ( Certpost )
footprint.get('/acquisition/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Certpost);
  res.redirect('/footprint/acquisition');
});
footprint.get('/acquisition/api', (req, res, next) => {
  getPostsList(req, res, next)(Certpost);
});
footprint.get('/acquisition', (req, res) => {
  res.render('import/footprint/acquisition', {});
});
footprint.get('/acquisition/post', (req, res) => {
  res.render('import/footprint/post.pug');
});

footprint.post('/acquisition/post', uploads.single('file'), acquisitionPost);

// 수상 내역 ( Award )
footprint.get('/awards/api/create-bulk', (req, res) => {
  createBulkBoard(Award);
  res.redirect('/footprint/awards');
});
footprint.get('/awards/api', (req, res, next) => {
  getPostsList(req, res, next)(Award);
});

footprint.get('/awards', (req, res) => {
  res.render('import/footprint/awards', {});
});

// 포트폴리오 ( Portfolio )
footprint.get('/portfolio/api/create-bulk', (req, res) => {
  createBulkBoard(Portfolio);
  res.redirect('/footprint/portfolio');
});
footprint.get('/portfolio/api', (req, res, next) => {
  getPostsList(req, res, next)(Portfolio);
});

footprint.get('/portfolio', (req, res) => {
  res.render('import/footprint/portfolio', {});
});
footprint.get('/portfolio/post', (req, res) => {
  res.render('import/footprint/post', {});
});


export default footprint;
