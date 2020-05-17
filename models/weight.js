module.exports = (sequelize, DataTypes) => {
  const Weight = sequelize.define(
    'Weight',
    {
      weight: DataTypes.INTEGER,
      daylogId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {},
  );
  Weight.associate = function (models) {
    Weight.belongsTo(models.Daylog, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
    // associations can be defined here
  };
  return Weight;
};
