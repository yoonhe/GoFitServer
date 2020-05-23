const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
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

module.exports = router;
