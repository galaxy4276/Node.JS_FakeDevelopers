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
community.get('/board/create',);
community.get('/board/api/index', (req, res, next) => {
  getIdx(req, res, next)(Community);
});
community.get('/board/api/create-bulk', (req, res, next) => {
  createBulkBoard(req, next)(Community);
  res.redirect('/community/board');
});
community.post('/board/api/create');
community.get('/board/api', (req, res, next) => {
  getPostsList(req, res, next)(Community);
});
community.get('/board', (req, res) => {
  res.render('import/community/board', {});
});


// 후배 양도 ( Donate )
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
