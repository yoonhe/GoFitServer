module.exports = {
  up: (queryInterface, Sequelize) => {
    const results = [];

    const tagNames = [
      'Water',
      'Walking',
      '스쿼트',
      '3일째...',
      '화이팅',
      '할 수 있다',
      '포기하지 말자!',
    ];

    for (let i = 0; i < tagNames.length; i += 1) {
      const obj = {
        name: tagNames[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      results.push(obj);
    }
    return queryInterface.bulkInsert('Tags', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  },
};
