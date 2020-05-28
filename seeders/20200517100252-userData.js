/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const datas = [];
    for (let i = 1; i < 15; i++) {
      const obj = {
        id: i,
        email: `test${i}@example.com`,
        username: `testUser${i}`,
        password: `1234`,
        height: `17${i}`,
        weight: 70 + i * 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      datas.push(obj);
    }

    return queryInterface.bulkInsert('Users', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
