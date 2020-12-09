export const getRenderCreate = (req, res, next) => {
  const redirectUrl = req.originalUrl
    .match(/\/[a-z]+/g);

  const referrer = req.originalUrl
    .match(/\/[a-z]+/g)
    .join('');


  res.render(`import${redirectUrl[0]}/create`, { referrer });
}

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log('UnAuthorised Aceess.');
    res.redirect('/');
  }
}

export const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
}