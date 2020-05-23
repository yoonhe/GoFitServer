module.exports = (sequelize, DataTypes) => {
  const Healthlog = sequelize.define(
    'Healthlog',
    {
      weight: DataTypes.INTEGER,
      water: DataTypes.INTEGER,
    },
    {},
  );
  Healthlog.associate = function (models) {
    Healthlog.belongsTo(models.Daylog);
  };
  return Healthlog;
};
