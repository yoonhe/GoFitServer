const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
  // Strategy 성공 시 호출됨, 여기의 user.id 가 deserializeUser의 첫 번째 매개변수로 이동
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    // 매개변수 id 는 serializeUser의 done의 인자 user를 받은 것
    try {
      console.log('Passport', id);
      const user = await db.User.findOne({
        where: { id },
      });
      return done(null, user); // 여기의 user가 req.user가 됨
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};
