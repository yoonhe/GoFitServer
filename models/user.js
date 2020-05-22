module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER, // 회원 가입 당시 몸무게
    },
    {
      hooks: {
        // hooks : sequelize 되는 before/after로 작용하는 것
        afterValidate: (data, options) => {},
      },
    },
  );
  User.associate = function (models) {
    // User.hasMany(models.Video);
    User.hasMany(models.Daylog);
  };
  return User;
};
