import passport from 'passport';
import sequelize from '../../models';
import local from './local';

const { User } = sequelize;

export default () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log('deserializeUser');
      console.log(id);
      const user = await User.findOne({
        where: { id }
      });

      done(null, user);
    } catch (e) {
      console.log('auth: deserializeUser error');
      console.log(e);
      done(e);
    }
  });

  local(passport, User);
}