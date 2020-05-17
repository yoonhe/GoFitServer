module.exports = (sequelize, DataTypes) => {
  const Daylog = sequelize.define(
    'Daylog',
    {
      message: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {},
  );
  Daylog.associate = function (models) {
    Daylog.belongsTo(models.User, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
    Daylog.hasMany(models.Video, {
      foreignKey: 'daylogId',
    });
    Daylog.hasOne(models.Weight, {
      foreignKey: 'daylogId',
    });
  };
  return Daylog;
};
