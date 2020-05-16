const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // 들어올 body 데이터 입력.
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await db.User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { reason: '존재하지 않는 사용자입니다' }); //  첫 번째 인자는 서버쪽 에러, 두번째 인자는 성공했을 때. 마지막 인자는 로직 상 에러.
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user); // 로그인 성공!
          }
          return done(null, false, { reason: '비밀번호가 올바르지 않습니다.' });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      },
    ),
  );
};
