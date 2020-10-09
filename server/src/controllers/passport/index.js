import passport from 'passport';
import sequelize from '../../models';
import local from './local';

const { User } = sequelize;

/*
  구성해둔 전략 (함수) 를 실행
  arguments
  1: passport Module
  2: sequelize Schema
*/
local(passport, User);


passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  await User.findByPk(id)
    .then(user => done(null, user.id))
    .catch(err => done(null, false, { message: err }));
}) ;


export default passport;