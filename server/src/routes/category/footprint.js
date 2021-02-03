import { uploads } from '../../controllers/crud/post';
import postBoard from '../../controllers/crud/post';
import { createBulkBoard } from '../../lib/createBulkData';
import  getPostsList from '../../controllers/pagination/getPostsList';
import getIdx from '../../controllers/pagination/getPageIdx';
import sequelize from '../../models';
import deletePost from "../../controllers/crud/delete";
import updatePost from "../../controllers/crud/update";
import readPost from "../../controllers/crud/read";
import {getRenderCreate, isLoggedIn} from "../../controllers/post";
import addComment from "../../controllers/comment";
import community from "./community";

const { 
  Certpost,
  Award,
  Portfolio
 } = sequelize;


const footprint = require('express').Router();

// 자격증 취득 ( Certpost )
footprint.get('/acquisition', (req, res) => {
  res.render('import/footprint/acquisition', { user: req.user?.id });
});
footprint.post('/acquisition/create', uploads.array('file'),
  (req, res, next) => {
    postBoard(req, res, next)(Certpost);
  });
footprint.post('/acquisition/:id([0-9]+)/comment', (req, res, next) => {
  addComment(req, res, next)(Certpost);
});
footprint.get('/acquisition/create',  isLoggedIn, getRenderCreate);
footprint.get('/acquisition/api/index', (req, res, next) => {
  getIdx(req, res, next)(Certpost);
});
footprint.get('/acquisition/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Certpost);
  res.redirect('/footprint/acquisition');
});
footprint.get('\/acquisition\/api$', (req, res, next) => {
  getPostsList(req, res, next)(Certpost);
});
footprint.delete('/acquisition/:id([0-9]+)/delete', isLoggedIn, (req, res, next) => {
  deletePost(req, res, next)(Certpost);
});
footprint.patch('/acquisition/:id([0-9]+)/update', isLoggedIn, (req, res, next) => {
  res.render('import/footprint/update');
});
footprint.patch('/acquisition/:id([0-9]+)/update', isLoggedIn, (req, res, next) => {
  updatePost(req, res, next)(Certpost);
});
footprint.get('/acquisition/:id([0-9]+)', (req, res, next) => {
  readPost(req, res, next)(Certpost);
});

// 수상 내역 ( Award )
footprint.get('/awards', (req, res) => {
  res.render('import/footprint/awards', { user: req.user?.id });
});
footprint.post('/awards/create', uploads.array('file'),
  (req, res, next) => {
    postBoard(req, res, next)(Award);
  });
footprint.post('/awards/:id([0-9]+)/comment', (req, res, next) => {
  addComment(req, res, next)(Award);
});
footprint.get('/awards/create', isLoggedIn, getRenderCreate);
footprint.get('/awards/api/index', (req, res, next) => {
  getIdx(req, res, next)(Award);
});
footprint.get('/awards/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Award);
  res.redirect('/footprint/awards');
});
footprint.get('\/awards\/api$', (req, res, next) => {
  getPostsList(req, res, next)(Award);
});
footprint.delete('/awards/:id([0-9]+)/delete', isLoggedIn,  (req, res, next) => {
  deletePost(req, res, next)(Award);
});
footprint.patch('/awards/:id([0-9]+)/update', isLoggedIn, (req, res, next) => {
  updatePost(req, res, next)(Award);
});
footprint.get('/awards/:id([0-9]+)', (req, res, next) => {
  readPost(req, res, next)(Award);
});

// 포트폴리오 ( Portfolio )
footprint.get('/portfolio', (req, res) => {
  res.render('import/footprint/portfolio', { user: req.user?.id });
});
footprint.post('/portfolio/create', isLoggedIn, uploads.array('file'),
  (req, res, next) => {
    postBoard(req, res, next)(Portfolio);
  });
footprint.post('/portfolio/:id([0-9]+)/comment', (req, res, next) => {
  addComment(req, res, next)(Portfolio);
});
footprint.get('/portfolio/create', isLoggedIn, getRenderCreate);
footprint.get('/portfolio/api/index', (req, res, next) => {
  getIdx(req, res, next)(Portfolio);
});
footprint.get('/portfolio/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Portfolio);
  res.redirect('/footprint/portfolio');
});
footprint.get('\/portfolio\/api$', (req, res, next) => {
  getPostsList(req, res, next)(Portfolio);
});
footprint.get('/portfolio/post', (req, res) => {
  res.render('import/footprint/post', {});
});
footprint.delete('/portfolio/:id([0-9]+)/delete', isLoggedIn, (req, res, next) => {
  deletePost(req, res, next)(Portfolio);
});
footprint.patch('/portfolio/:id([0-9]+)/update', isLoggedIn, (req, res, next) => {
  updatePost(req, res, next)(Portfolio);
});
footprint.get('/portfolio/:id([0-9]+)', (req, res, next) => {
  readPost(req, res, next)(Portfolio);
});


export default footprint;
