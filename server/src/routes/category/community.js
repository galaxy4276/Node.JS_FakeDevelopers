import { getRenderCreate } from "../../controllers/post";
import postBoard, { uploads } from '../../controllers/crud/post';
import deletePost from '../../controllers/crud/delete';
import updatePost from '../../controllers/crud/update';
import readPost from '../../controllers/crud/read';

const community = require('express').Router();
import sequelize from '../../models';
import { createBulkBoard } from '../../lib/createBulkData';
import  getPostsList from '../../controllers/pagination/getPostsList';
import getIdx from '../../controllers/pagination/getPageIdx';


const { 
  Community,
  Donate,
} = sequelize;

// Router & Controllers ( 차 후 분리 필요 )

// 학과 이야기 ( Community )
community.get('/board/create', getRenderCreate);
community.get('/board/:id', (req, res, next) => {
  readPost(req, res, next)(Community);
})
community.get('/board/api/index', (req, res, next) => {
  getIdx(req, res, next)(Community);
});
community.get('/board/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Community);
  res.redirect('/community/board');
});
community.get('/board/api', (req, res, next) => {
  getPostsList(req, res, next)(Community);
});
community.get('/board', (req, res) => {
  res.render('import/community/board', {});
});
// POST
community.post('/board/create', uploads.array('file'), (req, res, next) => {
  postBoard(req, res, next)(Community);
});
community.post('/board/api/create');

// DELETE
community.delete('/board/:id/delete', (req, res, next) => {
  deletePost(req, res, next)(Community);
});

// PATCH
community.patch('/board/:id/update', (req, res, next) => {
  updatePost(req, res, next)(Community);
});

// 후배 양도 ( Donate )
community.get('/donation/create', getRenderCreate);
community.get('/donation/api/index', (req, res, next) => {
  getIdx(req, res, next)(Donate);
  res.redirect('/footprint/acquisition');
});
community.get('/donation/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Donate);
  res.redirect('/community/donation');
});
community.get('/donation/api', (req, res, next) => {
  getPostsList(req, res, next)(Donate);
});
community.get('/donation', (req, res) => {
  res.render('import/community/donation', {});
});

// 개선 사항 제안 ( Suggest ) 
community.get('/suggestion', (req, res) => {
  res.render('import/community/suggestion', {});
});

// 공지 사항 ( Notice )
community.get('/notice', (req, res) => {
  res.render('import/community/notice', {});
});

export default community;
