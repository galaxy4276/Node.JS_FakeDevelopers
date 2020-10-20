export default (sequelize, DataTypes) => {
  const Donate = sequelize.define('Donate', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
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

  Donate.associate = (db) => {
    db.Donate.belongsTo(db.User);
  }

  return Donate;
} 