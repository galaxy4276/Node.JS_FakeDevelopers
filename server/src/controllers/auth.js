export const postJoin = ({ body }, res) => {
  const { id, password, pwcheck, email } = body;

  console.log(id, password, pwcheck, email);

  res.redirect('/');
};

export const login = (___, res) => {
  res.render('components/_login', {});
};

export const join = (___, res) => {
  res.render('components/_join', {});
};