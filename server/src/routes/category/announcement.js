const announcement = require('express').Router();


announcement.get('/board', (req, res) => {
  res.render('import/announcement/board', {});
});


export default announcement;
