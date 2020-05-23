/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const models = require('../models');

const { User } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const datas = ['', 'Good job today', 'excited', 'so tired', 'zzz...', 'okay'];
    const results = [];
    for (let i = 1; i < 6; i++) {
      const user = await User.findOne({ where: { id: i } });
      const obj = {
        id: i,
        message: datas[i],
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      results.push(obj);
    }
    return queryInterface.bulkInsert('Daylogs', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Daylogs', null, {});
  },
};
