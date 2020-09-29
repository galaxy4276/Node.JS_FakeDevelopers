const User = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.STRING(35),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
};

export default User;