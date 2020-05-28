/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
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
      results.push(obj);
    }
    return queryInterface.bulkInsert('Videos', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Videos', null, {});
  },
};
