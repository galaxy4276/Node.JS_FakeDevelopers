import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import sequelize from '../models';
import bcrypt from 'bcrypt';

const { User } = sequelize;


passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password'
}, async (userId, userPw, done) => {
  try {
    const find = await User.findByPk(userId);
    const { id, password } = find.dataValues;
    console.table({ value: password});

    const verify = await bcrypt.compare(userPw, password);
    console.log(`verify: ${verify}`);
    if ( id === userId ) {
      ( verify ) 
        ? done(null, find) 
        : done(null, false, { message: '패스워드 값이 일치하지 않습니다. ' });
    } else {
      console.log('아이디값이 다름');
      return done(null, false, { message: '아이디가 일치하지 않습니다. '});
    }
  } catch (e) {
    console.log(e);
  }
}));

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  await User.findByPk(id)
    .then(user => done(null, user.id))
    .catch(err => done(null, false, { message: err }));
}) ;


export default passport;