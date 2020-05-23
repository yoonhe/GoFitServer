/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const models = require('../models');

const { Daylog } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const results = [];
    for (let i = 1; i < 6; i++) {
      const daylog = await Daylog.findOne({ where: { id: i } });
      const obj = {
        id: i,
        weight: 50 + i * 4,
        water: i - 1,
        daylogId: daylog.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      results.push(obj);
    }
    return queryInterface.bulkInsert('Healthlogs', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Healthlogs', null, {});
  },
};
