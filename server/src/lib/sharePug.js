const sharePug = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

export default sharePug;