const community = require('express').Router();


community.get('/board', (req, res) => {
  res.render('import/community/board', {});
});

community.get('/donation', (req, res) => {
  res.render('import/community/donation', {});
});

community.get('/suggestion', (req, res) => {
  res.render('import/community/suggestion', {});
});


export default community;
