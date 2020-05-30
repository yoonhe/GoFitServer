/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const moment = require('moment');
const models = require('../models');

const { User } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const datas = ['Hello Hello', 'Good job today', 'excited', 'so tired', 'zzz...', 'okay'];
    const results = [];
    for (let i = 1; i < 200; i++) {
      const oneUser = await User.findOne({ where: { id: Math.floor(Math.random() * 10) + 1 } });

      // 이번 주 데이터
      const obj = {
        id: i,
        message: datas[Math.floor(Math.random() * datas.length)],
        UserId: oneUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 일주일 전
      const obj2 = {
        id: 199 + i,
        message: datas[Math.floor(Math.random() * datas.length)],
        UserId: oneUser.id,
        createdAt: moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss'),
      };
      results.push(obj);
      results.push(obj2);
    }
    return queryInterface.bulkInsert('Daylogs', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Daylogs', null, {});
  },
};
