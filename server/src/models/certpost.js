export default (sequelize, DataTypes) => {
  const Certpost = sequelize.define('Certpost', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    user: {
      type: DataTypes.STRING(200),
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  Certpost.associate = (db) => {
    db.Certpost.belongsTo(db.User);
  }

  return Certpost;
} 