/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const sequelize = require('sequelize');

const { Op } = sequelize;
const moment = require('moment');
const db = require('../models');

// 현재 날짜가 속한 달의 게시물을 전체 get
router.get('/', async (req, res, next) => {
  const { id } = req.user; // DB 의 userId임
  const year = moment().format('YYYY');
  const month = moment().format('MM');
  try {
    const logs = await db.Daylog.findAll({
      where: {
        userId: id,
        createdAt: {
          [Op.gte]: new Date(`${year}-${month}-01 00:00:00.000Z`),
          [Op.lte]: new Date(
            `${year}-${month}-${new Date(year, month, 0).getDate()} 23:59:59.000Z`,
          ),
        },
      },
      include: [{ model: db.Video }, { model: db.Healthlog }],
      raw: true,
    });

    res.json(200, logs);
  } catch (e) {
    console.error(e);
    res.status(500).send('network error');
    next(e);
  }
});

// 특정 날짜를 포함한 달의 전체 데이로그를 겟 할 때
router.get('/:date', async (req, res, next) => {
  const { id } = req.user; // DB 의 userId임
  const targetDate = moment(req.params.date).format('YYYY-MM');
  const year = moment(targetDate).format('YYYY');
  const month = moment(targetDate).format('MM');
  try {
    const logs = await db.Daylog.findAll({
      where: {
        userId: id,
        createdAt: {
          [Op.gte]: new Date(`${year}-${month}-01 00:00:00.000Z`),
          [Op.lte]: new Date(
            `${year}-${month}-${new Date(year, month, 0).getDate()} 23:59:59.000Z`,
          ),
        },
      },
      include: [{ model: db.Video }, { model: db.Healthlog }],
      raw: true,
    });
    res.send(200, logs);
  } catch (e) {
    console.error(e);
    res.status(500).send('network error');
    next(e);
  }
});

// 현재 날짜에 포스트 날리기
router.post('/', async (req, res, next) => {
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
    res.status(200).send('create success!');
  } catch (e) {
    console.error(e);
    res.status(500).send('network error');
    next(e);
  }
});

// 특정 날짜의 게시물 수정하기
router.post('/edit/:targetId', async (req, res, next) => {
  const { message, weight, water } = req.body;
  const { id } = req.user; // DB 의 userId임
  const { targetId } = req.params;
  try {
    await db.Daylog.update({ message }, { where: { id: targetId, UserId: id } });
    await db.Healthlog.update({ weight, water }, { where: { DaylogId: targetId } });
    res.status(200).send('edit success!');
  } catch (e) {
    console.error(e);
    res.status(500).send('network error');
    next(e);
  }
});

module.exports = router;
