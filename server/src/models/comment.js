import { Model, DataTypes } from 'sequelize';

export default class Comment extends Model {
 static init(sequelize) {
    return super.init({
      comment: {
        type: DataTypes.STRING(400),
        allowNull: false,
      }
    }, {
      modelName: 'Comment',
      tableName: 'comments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.Community);
    db.Comment.belongsTo(db.Certpost);
    db.Comment.belongsTo(db.Donate);
    db.Comment.belongsTo(db.Announcement);
    db.Comment.belongsTo(db.Award);
    db.Comment.belongsTo(db.Portfolio);
    db.Comment.belongsTo(db.Suggest);
    db.Comment.belongsTo(db.Notice);
    db.Comment.belongsTo(db.User);
  }
}