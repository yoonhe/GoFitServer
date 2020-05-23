/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const sequelize = require('sequelize');

const { Op } = sequelize;
const moment = require('moment');
const db = require('../models');

// 현재 날짜가 속한 달의 게시물을 전체 get
router.get('/daylog', async (req, res, next) => {
  const { id } = req.user; // DB 의 userId임
  const currentDate = moment().format('YYYY-MM');
  try {
    const logs = await db.Daylog.findAll({
      where: {
        userId: id,
        createdAt: {
          [Op.gte]: new Date(`${currentDate}-01 00:00:00.000Z`),
          [Op.lte]: new Date(`${currentDate}-31 23:59:59.000Z`),
        },
      },
      include: [{ model: db.Healthlog }, { model: db.Video }],
      raw: true,
    });

    res.json(200, logs);
  } catch (e) {
    console.error(e);
    res.status(500).status('network error');
    next(e);
  }
});

// 특정 날짜를 포함한 달의 전체 데이로그를 겟 할 때
router.get('/daylog/:date', async (req, res, next) => {
  const { id } = req.user; // DB 의 userId임
  const targetDate = moment(req.params.date).format('YYYY-MM');
  try {
    const logs = await db.Daylog.findAll({
      where: {
        userId: id,
        createdAt: {
          [Op.gte]: new Date(`${targetDate}-01 00:00:00.000Z`),
          [Op.lte]: new Date(`${targetDate}-31 23:59:59.000Z`),
        },
      },
      include: [{ model: db.Healthlog }, { model: db.Video }],
      raw: true,
    });
    res.send(200, logs);
  } catch (e) {
    console.error(e);
    res.status(500).status('network error');
    next(e);
  }
});

// 현재 날짜에 포스트 날리기
router.post('/daylog', async (req, res, next) => {
  const { message, youtubeTitle, youtubeTime, url, weight, water } = req.body;
  const { id } = req.user; // DB 의 userId임
  try {
    await db.Daylog.create({ UserId: id, message }).then(daylog => {
      db.Video.create({
        DaylogId: daylog.id,
        url,
        youtubeTime,
        youtubeTitle,
      });
      db.Healthlog.create({
        DaylogId: daylog.id,
        weight,
        water,
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).status('network error');
    next(e);
  }
});

// 특정 날짜의 게시물 수정하기
router.post('/daylog/edit/:targetId', async (req, res, next) => {
  const { message, weight, water } = req.body;
  const { id } = req.user; // DB 의 userId임
  const { targetId } = req.params;
  try {
    await db.Daylog.update({ message }, { where: { id: targetId, UserId: id } });
    await db.Healthlog.update({ weight, water }, { where: { DaylogId: targetId } });
  } catch (e) {
    console.error(e);
    res.status(500).status('network error');
    next(e);
  }
}); // 과거 포스트 수정

module.exports = router;
