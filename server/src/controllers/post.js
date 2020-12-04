export const getRenderCreate = (req, res, next) => {
  const redirectUrl = req.originalUrl
    .match(/\/[a-z]+/g);

  const referrer = req.originalUrl
    .match(/\/[a-z]+/g)
    .join('');

  res.render(`import${redirectUrl[0]}/create`, { referrer });
}