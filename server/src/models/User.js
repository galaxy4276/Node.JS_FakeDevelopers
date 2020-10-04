const User = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.STRING(35),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
};

export default User;