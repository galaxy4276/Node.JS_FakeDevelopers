const globalRouter = require('express').Router();


globalRouter.get('/', (req, res) => {
  res.render('screens/index', { title: 'hello' });
});

globalRouter.get('/test', (req, res) => {
  res.render('screens/__dev_wscrg', {});
});



export default globalRouter;