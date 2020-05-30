/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const datas = [];

    const usernameArr = [
      '',
      'Mr.Hong',
      'Xi Quang',
      'Alex',
      'Alice',
      'Bella',
      'Casey',
      'Clara',
      'Daisy',
      'Elas',
      'Floar',
      'Grace',
      'Fay',
      'Esther',
      'Dana',
    ];

    for (let i = 1; i < 15; i++) {
      const salt = bcrypt.genSaltSync();
      const obj = {
        id: i,
        email: `test${i}@example.com`,
        username: usernameArr[i],
        password: bcrypt.hashSync('1234', salt),
        height: `17${i}`,
        weight: 70 + i * 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
      };
      datas.push(obj);
    }

    // admin 계정 생성.
    const salt = bcrypt.genSaltSync();
    datas.push({
      email: `admin`,
      username: `admin`,
      password: bcrypt.hashSync('1234', salt),
      height: `174`,
      weight: 70 + 2 * 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: new Date(),
    });

    return queryInterface.bulkInsert('Users', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
