const globalRouter = require('express').Router();


globalRouter.get('/', (req, res) => {
  res.render('screens/index', { title: 'hello' });
});

globalRouter.get('/login', (req, res) => {
  res.render('components/__dev_login', { user: 'user' });
});


export default globalRouter;