const sharePug = (req, res, next) => {
  req.locals.user = req.user;
  next();
};

export default sharePug;