const globalRouter = require('express').Router();


globalRouter.get('/', (req, res) => {
  res.render('index.html', { title: 'hello' });
});


export default globalRouter;