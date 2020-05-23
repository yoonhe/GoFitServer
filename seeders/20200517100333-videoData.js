/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const models = require('../models');

const { Daylog } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const datas = [
      '',
      'https://youtu.be/3Ryu8mDcqo8',
      'https://youtu.be/c-dfaA3Bt1k',
      'https://youtu.be/VVn5IUM8sms',
      'https://youtu.be/nQlbDogfCpE',
      'https://youtu.be/lKwZ2DU4P-A',
    ];
    const results = [];
    for (let i = 1; i < 6; i++) {
      const daylog = await Daylog.findOne({ where: { id: i } });
      const obj = {
        id: i,
        url: datas[i],
        title: `title ${i}`,
        duration: `1${i}:${i}${i + 1}`,
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
