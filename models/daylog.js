/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Daylog = sequelize.define(
    'Daylog',
    {
      message: DataTypes.TEXT,
    },
    {},
  );
  Daylog.associate = function (models) {
    Daylog.belongsTo(models.User);
    Daylog.hasMany(models.Video);
    Daylog.hasOne(models.Healthlog);
  };
  return Daylog;
};
