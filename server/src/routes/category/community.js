import {getRenderCreate, isLoggedIn, isNotLoggedIn} from "../../controllers/post";
import postBoard, { uploads } from '../../controllers/crud/post';
import deletePost from '../../controllers/crud/delete';
import updatePost from '../../controllers/crud/update';
import readPost from '../../controllers/crud/read';
import addComment from '../../controllers/comment';

const community = require('express').Router();
import sequelize from '../../models';
import { createBulkBoard } from '../../lib/createBulkData';
import  getPostsList from '../../controllers/pagination/getPostsList';
import getIdx from '../../controllers/pagination/getPageIdx';


const {
  Community,
  Donate,
  Suggest,
  Notice,
  Comment
} = sequelize;

// Router & Controllers ( 차 후 분리 필요 )


// 학과 이야기

// <-- <test> -->

// null of code

// <-- </test> -->
community.get('/board', (req, res) => {
  res.render('import/community/board', { user: req.user?.id });
});
community.post('/board/create', isLoggedIn, uploads.array('file'), (req, res, next) => {
  postBoard(req, res, next)(Community);
  console.log('create /board/create');
});
community.post('/board/:id([0-9]+)/comment', (req, res, next) => {
  addComment(req, res, next)(Community);
});
community.get('/board/create', isLoggedIn, getRenderCreate);
community.get('/board/api/index', (req, res, next) => {
  getIdx(req, res, next)(Community);
});
community.get('/board/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Community);
  console.log('get /board/api/create-bulk');
  res.redirect('/community/board');
});
community.get('^\/board\/api$', (req, res, next) => {
  getPostsList(req, res, next)(Community);
  console.log('get /board/api');
});
community.get('/board/:id([0-9]+)/update', isLoggedIn, async (req, res, next) => {
  const redirectUrl = req.originalUrl
    .match(/\/[a-z]+\/\w+\/\w+/)
    .join('');

  const postData = await Community.findOne({ where: { id: req.params.id }});

  res.render('import/community/update', { referrer: redirectUrl, postData });
});
community.patch('/board/:id([0-9]+)/update', isLoggedIn, uploads.array ('file'), (req, res, next) => {
  console.log('update (patch) router');
  updatePost(req, res, next)(Community);
});
community.delete('/board/:id([0-9]+)/delete', isLoggedIn, (req, res, next) => {
  deletePost(req, res, next)(Community);
});
community.get('/board/:id([0-9]+)', (req, res, next) => {
  readPost(req, res, next)(Community);
  console.log('/board/:id([0-9]+) GET');
});

// 후배 양도 ( Donate )
community.get('/donation', (req, res) => {
  res.render('import/community/donation', { user: req.user?.id });
});
community.post('/donation/create', isLoggedIn, uploads.array('file'), (req, res, next) => {
  postBoard(req, res, next)(Donate);
  console.log('create /donation/create');
});
community.post('/donation/:id([0-9]+)/comment', (req, res, next) => {
  addComment(req, res, next)(Donate);
});
community.get('/donation/create', isLoggedIn, getRenderCreate);
community.get('/donation/api/index', (req, res, next) => {
  getIdx(req, res, next)(Donate);
});
community.get('/donation/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Donate);
  res.redirect('/community/donation');
});
community.get('\/donation\/api$', (req, res, next) => {
  getPostsList(req, res, next)(Donate);
});
community.delete('/donation/:id([0-9]+)/delete', isLoggedIn, (req, res, next) => {
  deletePost(req, res, next)(Donate);
});
community.get('/donation/:id([0-9]+)/update', isLoggedIn, (req, res, next) => {
  res.render('import/community/update');
});
community.patch('/donation/:id([0-9]+)/update', (req, res, next) => {
  console.log('PATCH post');
  updatePost(req, res, next)(Donate);
});
community.get('/donation/:id([0-9]+)', isLoggedIn, (req, res, next) => {
  readPost(req, res, next)(Donate);
});


// 개선 사항 제안 ( Suggest ) 
community.get('/suggestion', (req, res) => {
  res.render('import/community/suggestion', { user: req.user?.id });
});
community.post('/suggestion/create', uploads.array('file'), (req, res, next) => {
  postBoard(req, res, next)(Suggest);
});
community.post('/suggestion/:id([0-9]+)/comment', (req, res, next) => {
  addComment(req, res, next)(Suggest);
});
community.get('/suggestion/create', getRenderCreate);
community.get('/suggestion/api/index', (req, res, next) => {
  getIdx(req, res, next)(Suggest);
});
community.get('/suggestion/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Suggest);
  res.redirect('/community/suggestion');
});
community.get('\/suggestion\/api$', (req, res, next) => {
  getPostsList(req, res, next)(Suggest);
});
community.delete('/suggestion/:id([0-9]+)/delete', (req, res, next) => {
  deletePost(req, res, next)(Suggest);
});
community.get('/suggestion/:id([0-9]+)/update', isLoggedIn, (req, res, next) => {
  res.render('import/community/update');
});
community.patch('/suggestion/:id([0-9]+)/update', (req, res, next) => {
  updatePost(req, res, next)(Suggest);
});
community.get('/suggestion/:id([0-9]+)', (req, res, next) => {
  readPost(req, res, next)(Suggest);
});

// 공지 사항 ( Notice )
community.get('/notice', (req, res) => {
  res.render('import/community/notice', { user: req.user?.id });
});
community.post('/notice/:id([0-9]+)/comment', (req, res, next) => {
  addComment(req, res, next)(Notice);
});
community.post('/notice/create', uploads.array('file'), (req, res, next) => {
  postBoard(req, res, next)(Notice);
});
community.get('/notice/create', getRenderCreate);
community.get('/notice/api/index', (req, res, next) => {
  getIdx(req, res, next)(Notice);
});
community.get('/notice/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Notice);
  res.redirect('/community/notice');
});
community.get('\/notice\/api$', (req, res, next) => {
  getPostsList(req, res, next)(Notice);
});
community.delete('/notice/:id([0-9]+)/delete', (req, res, next) => {
  deletePost(req, res, next)(Notice);
});
community.get('/notice/:id([0-9]+)/update', isLoggedIn, (req, res, next) => {
  res.render('import/community/update');
});
community.patch('/notice/:id([0-9]+)/update', (req, res, next) => {
  updatePost(req, res, next)(Notice);
});
community.get('/notice/:id([0-9]+)', (req, res, next) => {
  readPost(req, res, next)(Notice);
});

export default community;
