module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DaylogTag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      DaylogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Daylogs',
          key: 'id',
        },
      },
      TagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DaylogTag');
  },
};
