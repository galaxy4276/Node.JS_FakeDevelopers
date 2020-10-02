const globalRouter = require('express').Router();


globalRouter.get('/', (req, res) => {
  res.render('screens/index', { title: 'hello' });
});

globalRouter.get('/login', (req, res) => {
  res.render('components/_login', {});
});

globalRouter.get('/join', (req, res) => {
  res.render('components/_join', {});
});


export default globalRouter;