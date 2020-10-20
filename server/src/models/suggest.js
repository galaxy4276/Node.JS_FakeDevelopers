export default (sequelize, DataTypes) => {
  const Suggest = sequelize.define('Suggest', {
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

  Suggest.associate = (db) => {
    db.Suggest.belongsTo(db.User);
  }

  return Suggest;
} 