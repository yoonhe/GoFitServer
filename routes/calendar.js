const express = require('express');
const sequelize = require('sequelize');

const { Op } = sequelize;
const db = require('../models');

const router = express.Router();

module.exports = router;

router.get('/:date', async (req, res, next) => {
  try {
    const year = req.params.date.split('-')[0];
    const month = req.params.date.split('-')[1];

    const workingDay = await db.Daylog.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('year', sequelize.col('createdAt')), year),
          sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), month),
        ],
        userId: req.user.id,
      },
      attributes: ['createdAt'],
    });

    res.json(workingDay);
  } catch (e) {
    next(e);
    console.error(e);
  }
});
