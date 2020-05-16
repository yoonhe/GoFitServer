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

router.get('/signup', async (req, res, next) => {
  try {
    // Database Logic
    res.send(200);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
