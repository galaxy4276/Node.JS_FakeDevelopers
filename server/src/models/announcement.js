import { Model, DataTypes } from 'sequelize';


export default class Announcement extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Announcement',
      tableName: 'announcements',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }
  
  static associate(db) {
    db.Announcement.belongsTo(db.User);
    db.Announcement.hasMany(db.Inquiry);
    db.Announcement.hasMany(db.Image);
    db.Announcement.hasMany(db.Comment);
  }
}