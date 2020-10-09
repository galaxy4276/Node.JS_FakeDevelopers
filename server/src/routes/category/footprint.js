const footprint = require('express').Router();


footprint.get('/acquistion', (req, res) => {
  res.render('import/footprint/acquistion', {});
});

footprint.get('/awards', (req, res) => {
  res.render('import/footprint/awards', {});
});

footprint.get('/portfolio', (req, res) => {
  res.render('import/footprint/portfolio', {});
});


export default footprint;
