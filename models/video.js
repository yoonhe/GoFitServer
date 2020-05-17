module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      url: DataTypes.STRING,
      daylogId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      hooks: {
        // hooks : sequelize 되는 before/after로 작용하는 것
        afterValidate: (data, options) => {},
      },
    },
  );
  Video.associate = function (models) {
    Video.belongsTo(models.Daylog, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return Video;
};
