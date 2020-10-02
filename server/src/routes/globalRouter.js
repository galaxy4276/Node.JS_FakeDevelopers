const globalRouter = require('express').Router();


globalRouter.get('/', (req, res) => {
  res.render('screens/index', { title: 'hello' });
});


export default globalRouter;