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
          }).then(result => result.update({ lastLoginAt: new Date() }));
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
      return res.status(409).send('이미 사용중인 아이디입니다.');
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
  try {
    // const startDay = moment().day('Sunday').format('YYYY-MM-DD');
    // const endDay = moment().day('Saturday').format('YYYY-MM-DD');
    const startDay = moment(moment().subtract(7, 'days')).day('Sunday').format('YYYY-MM-DD');
    const endDay = moment(moment().subtract(7, 'days')).day('Saturday').format('YYYY-MM-DD');

    const data = await db.User.findAll({
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

    const rankArr = [];

    data.map(v => {
      const sum = v.Daylogs.reduce((acc, cur) => {
        return acc + Number(cur.Videos[0].youtubeTime);
      }, 0);
      const form = {
        id: v.id,
        sum,
      };
      rankArr.push(form);
    });

    rankArr.sort((a, b) => b.sum - a.sum);
    const rankId = rankArr.map(v => v.id);

    const rankUsers = await db.User.findAll({
      where: {
        id: {
          [Op.in]: rankId,
        },
      },
      raw: true,
    });

    const sortedUser = [];
    rankId.map((id, index) => {
      const userIndex = rankUsers.findIndex(user => user.id === id);
      rankUsers[userIndex].score = rankArr[index].sum;
      sortedUser.push(rankUsers[userIndex]);
    });

    res.json(sortedUser);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const user = { ...req.user.toJSON() };
      delete user.password;
      return res.json(user);
    }
    return res.send(401);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
