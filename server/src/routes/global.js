const globalRouter = require('express').Router();


globalRouter.get('/', (req, res) => {
  res.render('import/index', { title: 'hello' });
});


export default globalRouter;