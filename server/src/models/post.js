export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
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

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
  }

  return Post;
} 