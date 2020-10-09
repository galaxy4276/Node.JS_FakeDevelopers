import sequelize from '../models';
import url from 'url';
import passport from 'passport';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';


const { User } = sequelize;

const error = {
  alreadyUser() {
    return url.format({
      pathname: '/',
      query: {
        'error': 'already_user' 
      },
    });
  },

  pwIncorrect() {
    return url.format({
      pathname: '/',
      query: {
        'error': 'password_incorrect',
      },
    });
  },

  emailNotFound() {
    return url.format({
      pathname: '/',
      query: {
        'error': 'emailNotFound',
      },
    });
  },

  critical() {
    return url.format({
      pathname: '/',
      query: {
        'error': 'critical_plz_review_serverlog'
      },
    });
  },
};


export const postJoin = async ({ body }, res) => {
  const { id, password, pwcheck, email } = body;
  
  try {
    const verifyEmail = isEmail(email);
    const verifyUser = await User.findByPk(id);
    console.log(`verifyEmail: ${verifyEmail}`);
  
    if (!verifyEmail) {
      res.redirect(error.emailNotFound());
    }
    
    if (verifyUser) 
      res.redirect(error.alreadyUser());
    
    ((password === pwcheck) && verifyEmail)
      ? await User.create({
          id,
          password: await bcrypt.hash(password, 10),
          email,
      })
      : res.redirect(error.pwIncorrect());
    
    console.log('성공적으로 유저가 생성되었습니다!');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect(error.critical());
  }  
};

export const postLogin = passport.authenticate('local', {
  successRedirect: url.format({
    pathname: '/',
    query: {
      'success': 'login_done',
    },
  }),
  failureFlash: url.format({
    pathname: '/',
    query: {
      'failure': 'login_failure'
    }
  }),
});

export const login = (___, res) => {
  res.render('components/_login', {});
};

export const join = (___, res) => {
  res.render('components/_join', {});
};