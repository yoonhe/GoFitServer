/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const moment = require('moment');
const models = require('../models');

const { Daylog } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const results = [];
    for (let i = 1; i < 200; i++) {
      const daylog = await Daylog.findOne({ where: { id: i } });
      const obj = {
        id: i,
        weight: 50 + Math.floor(Math.random() * 9),
        water: Math.floor(Math.random() * 10),
        daylogId: daylog.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const obj2 = {
        id: 199 + i,
        weight: 50 + Math.floor(Math.random() * 9),
        water: Math.floor(Math.random() * 10),
        daylogId: 199 + i,
        createdAt: moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss'),
      };

      results.push(obj);
      results.push(obj2);
    }
    return queryInterface.bulkInsert('Healthlogs', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Healthlogs', null, {});
  },
};
