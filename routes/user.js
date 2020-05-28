const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const moment = require('moment');
const { Op } = require('sequelize');
const db = require('../models');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async loginErr => {
        try {
          if (loginErr) {
            return next(loginErr);
          }
          const fullUser = await db.User.findOne({
            where: { id: user.id },
          });
          return res.json(fullUser);
        } catch (e) {
          next(e);
        }
      });
    })(req, res, next);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
    const newUser = await db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      height: req.body.height,
      weight: req.body.weight,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.send('Success Logout!');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/rank', async (req, res, next) => {
  // 5월 1주차. 5월 2주차. 5월 3주차.
  // 오늘은 몇 년도 몇 월의 몇 주차일까?
  // 현재의 달을 가져오고. 몇 주차인지 알아야하고
  // 그 주간의 기간동안 운동의 누적시간을 구한다.

  // const startDay = moment(moment().subtract(7, 'days')).day('Sunday').format('YYYY-MM-DD');
  // const endDay = moment(moment().subtract(7, 'days')).day('Saturday').format('YYYY-MM-DD');

  const startDay = moment().day('Sunday').format('YYYY-MM-DD');
  const endDay = moment().day('Saturday').format('YYYY-MM-DD');

  console.log(startDay, endDay);

  // const test = await db.Daylog.findAll({
  //   where: {
  //     createdAt: {
  //       [Op.gte]: new Date(`${startDay} 00:00:00.000Z`),
  //       [Op.lte]: new Date(`${endDay} 23:59:59.000Z`),
  //     },
  //   },
  //   include: [
  //     {
  //       model: db.Video,
  //       attributes: ['youtubeTime'],
  //     },
  //   ],
  //   order: ['UserId'],
  // });

  const test = await db.User.findAll({
    include: [
      {
        model: db.Daylog,
        attributes: ['id'],
        include: [
          {
            model: db.Video,
            attributes: ['youtubeTime'],
            where: {
              createdAt: {
                [Op.gte]: new Date(`${startDay} 00:00:00.000Z`),
                [Op.lte]: new Date(`${endDay} 23:59:59.000Z`),
              },
            },
          },
        ],
      },
    ],
    attributes: ['id'],
    order: ['id'],
  });
  res.json(test);
});

module.exports = router;
