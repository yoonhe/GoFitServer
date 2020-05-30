module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'lastLoginAt', { type: Sequelize.DATE });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'lastLoginAt');
  },
};
