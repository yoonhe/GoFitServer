module.exports = (sequelize, DataTypes) => {
  const Weight = sequelize.define(
    'Weight',
    {
      weight: DataTypes.INTEGER,
    },
    {},
  );
  Weight.associate = function (models) {
    Weight.belongsTo(models.Daylog);
  };
  return Weight;
};
