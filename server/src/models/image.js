export default (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    src: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Image.associate = (db) => {
    db.Image.belongsTo(db.User);
  }

  return Image;
} 