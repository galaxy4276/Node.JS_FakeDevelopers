const intro = require('express').Router();


intro.get('/club', (req, res) => {
  res.render('import/intro/club', {});
});

intro.get('/env', (req, res) => {
  res.render('import/intro/env', {});
});

intro.get('/info', (req, res) => {
  res.render('import/intro/info', {});
});

intro.get('/member', (req, res) => {
  res.render('import/intro/member', {});
});


export default intro;
