import sequelize from '../../models';
const { 
  Community, 
  Donate,
  Suggest, 
  Notice,
} = sequelize;

import { createBulkBoard } from '../../lib/createBulkData';
import { getPostsList } from '../../controllers/post';

const community = require('express').Router();


// Custom Functions
const isEmpty = params => {
  return Object.keys(params).length === 0;
}

// Router & Controllers ( 차 후 분리 필요 )

// 학과 이야기 ( Community )
community.get('/board/api/create-bulk', (req, res, next) => {
  createBulkBoard(Community);
  res.redirect('/community/board');
});
community.get('/board/api', (req, res, next) => {
  getPostsList(req, res, next)(Community);
});
community.get('/board', (req, res) => {
  res.render('import/community/board', {});
});


// 후배 양도 ( Donate )
community.get('/donation/api/create-bulk', (req, res, next) => {
  createBulkBoard(Community);
  res.redirect('/community/donation');
});
community.get('/donation/api', (req, res, next) => {
  getPostsList(req, res, next)(Donate);
});
community.get('/donation', (req, res) => {
  res.render('import/community/donation', {});
});

// 바라는 점 ( Suggest )
community.get('/suggestion/api/create-bulk', (req, res, next) => {
  createBulkBoard(Suggest);
  res.redirect('/community/suggestion');
});
community.get('/suggestion/api', (req, res, next) => {
  getPostsList(req, res, next)(Suggest);
});
community.get('/suggestion', (req, res) => {
  res.render('import/community/suggestion', {});
});

// 공지사항 (notice)
community.get('/notice/api/create-bulk', (req, res, next) => {
  createBulkBoard(Notice);
  res.redirect('/community/notice');
});
community.get('/notice/api', (req, res, next) => {
  getPostsList(req, res, next)(Notice);
});
community.get('/notice', (req, res) => {
  res.render('import/community/notice', {});
});

export default community;
