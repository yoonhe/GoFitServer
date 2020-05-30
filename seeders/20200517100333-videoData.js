/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const moment = require('moment');
const models = require('../models');

const { Daylog } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const datas = [
      'https://youtu.be/3Ryu8mDcqo8',
      'https://youtu.be/c-dfaA3Bt1k',
      'https://youtu.be/VVn5IUM8sms',
      'https://youtu.be/nQlbDogfCpE',
      'https://youtu.be/lKwZ2DU4P-A',
    ];
    const results = [];
    for (let i = 1; i < 200; i++) {
      const daylog = await Daylog.findOne({ where: { id: i } });

      // 이번 주
      const obj = {
        id: i,
        url: datas[Math.floor(Math.random() * datas.length)],
        youtubeTitle: `title ${i}`,
        // youtubeTime: `0${Math.floor(Math.random() * 10)}:${Math.floor(
        //   Math.random() * 5,
        // )}${Math.floor(Math.random() * 10)}:05`,
        youtubeTime: Math.floor(Math.random() * 100),
        daylogId: daylog.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 일주일 전
      const obj2 = {
        id: 199 + i,
        url: datas[Math.floor(Math.random() * datas.length)],
        youtubeTitle: `title ${i}`,
        youtubeTime: Math.floor(Math.random() * 100),
        daylogId: daylog.id,
        createdAt: moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss'),
      };

      results.push(obj);
      results.push(obj2);
    }
    return queryInterface.bulkInsert('Videos', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Videos', null, {});
  },
};
