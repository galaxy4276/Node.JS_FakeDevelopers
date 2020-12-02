import { Model, DataTypes } from 'sequelize';


export default class Image extends Model {
  static init(sequelize) {
    return super.init({
      src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Image',
      tableName: 'images',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }

  static associate(db) {
    db.Image.belongsTo(db.Certpost);
    db.Image.belongsTo(db.Donate);
    db.Image.belongsTo(db.Portfolio);
    db.Image.belongsTo(db.Suggest);
    db.Image.belongsTo(db.Announcement);
    db.Image.belongsTo(db.Community);
    db.Image.belongsTo(db.Award);
    db.Image.belongsTo(db.Notice);
  }
}