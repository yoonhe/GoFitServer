const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const hpp = require('hpp');

const passportConfig = require('./passport');
const db = require('./models');
const mailingService = require('./services/mailing');

const userAPIRouter = require('./routes/user');
const daylogAPIRouter = require('./routes/daylog');
const calendarAPIRouter = require('./routes/calendar');
const videoAPIRouter = require('./routes/video');

const prod = process.env.NODE_ENV === 'production';
dotenv.config();
const app = express();
// db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: /gofit\.com$/,
      credentials: true,
    }),
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https를 쓸 때 true
      // domain: prod && '.nodebird.com', domain 있을 경우 주소 넣어줌.
    },
    name: 'rnbck',
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Go Fit Server 정상 동작!');
});

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/daylog', daylogAPIRouter);
app.use('/api/calendar', calendarAPIRouter);
app.use('/api/video', videoAPIRouter);

app.use(mailingService);

app.listen(prod ? process.env.PORT : process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

module.exports = app;
