export default (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
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

  Portfolio.associate = (db) => {
    db.Portfolio.belongsTo(db.User);
  }

  return Portfolio;
} 