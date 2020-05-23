module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      url: DataTypes.STRING,
      title: DataTypes.STRING,
      duration: DataTypes.STRING,
    },
    {
      hooks: {
        // hooks : sequelize 되는 before/after로 작용하는 것
        afterValidate: (data, options) => {},
      },
    },
  );
  Video.associate = function (models) {
    // Video.belongsTo(models.User);
    Video.belongsTo(models.Daylog);
  };
  return Video;
};
