export default (sequelize, DataTypes) => {
  const Award = sequelize.define('Award', {
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

  Award.associate = (db) => {
    db.Award.belongsTo(db.User);
  }

  return Award;
} 