const milestone = require('express').Router();


milestone.get('/career', (req, res) => {
  res.render('import/milestone/career', {});
});

milestone.get('/cert', (req, res) => {
  res.render('import/milestone/cert', {});
});

milestone.get('/curriculum', (req, res) => {
  res.render('import/milestone/curriculum', {});
});


export default milestone;
