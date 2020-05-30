/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const sequelize = require('sequelize');

const { Op } = sequelize;
const moment = require('moment');
const db = require('../models');

// 오늘 날짜 video GET (daylog가 등록 이미 된것만 볼 수 있음)
router.get('/', async (req, res, next) => {
  const { id } = req.user; // DB 의 userId임
  const date = moment().format('YYYY-MM-DD');
  try {
    const videos = await db.Daylog.findAll({
      where: {
        userId: id,
        createdAt: {
          [Op.gte]: new Date(`${date} 00:00:00.000Z`),
          [Op.lte]: new Date(`${date} 23:59:59.000Z`),
        },
      },
      attributes: ['id'],
      include: [
        {
          model: db.Video,
          required: true,
          attributes: ['id', 'url', 'youtubeTitle', 'youtubeTime'],
        },
      ],
      raw: true,
    });
    console.log(videos);
    res.json(200, videos);
  } catch (e) {
    console.log(e);
    res.status(500).send('Network Error');
    next(e);
  }
});

// 특정 날짜 비디오 GET
router.get('/video/:date', async (req, res, next) => {
  const { id } = req.user; // DB 의 userId임
  const date = moment(req.params.date).format('YYYY-MM-DD');
  try {
    const videos = await db.Daylog.findAll({
      where: {
        UserId: id,
        createdAt: {
          [Op.gte]: new Date(`${date} 00:00:00.000Z`),
          [Op.lte]: new Date(`${date} 23:59:59.000Z`),
        },
      },
      attributes: ['id'],
      raw: true,
      include: [
        {
          model: db.Video,
          required: true,
          attributes: ['id', 'url', 'youtubeTitle', 'youtubeTime'],
        },
      ],
    });
    res.json(200, videos);
  } catch (e) {
    console.log(e);
    res.status(500).send('Network Error');
    next(e);
  }
});

module.exports = router;
