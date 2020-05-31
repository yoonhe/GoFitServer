module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Healthlogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.STRING,
      },
      water: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      daylogId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'Daylogs',
          key: 'id',
        },
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Healthlogs');
  },
};
