/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const models = require('../models');

const { User } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const datas = ['', 'Good job today', 'excited', 'so tired', 'zzz...', 'okay'];
    const results = [];
    for (let i = 1; i < 200; i++) {
      const oneUser = await User.findOne({ where: { id: Math.floor(Math.random() * 10) + 1 } });

      const obj = {
        id: i,
        message: datas[Math.floor(Math.random() * datas.length)],
        UserId: oneUser.id,
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
