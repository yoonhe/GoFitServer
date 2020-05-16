const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => done(null, user.id)); // user.id 가 req.session.passport.user 에 저장.
  passport.deserializeUser(async (id, done) => {
    // deserializeUser은 실제 서버로 들어오는 요청마다 세션 정보(serializeUser에서 저장됨)를 실제 DB의 데이터와 비교
    try {
      console.log('Passport', id);
      const user = await db.User.findOne({
        where: { id },
      });
      return done(null, user); // req.user 에 저장.
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};
