import { Model, DataTypes } from 'sequelize';


export default class Community extends Model {
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
      modelName: 'Community',
      tableName: 'communities',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }
  
  static associate(db) {
    db.Community.belongsTo(db.User);
    db.Community.hasMany(db.Inquiry);
    db.Community.hasMany(db.Image);
    db.Community.hasMany(db.Comment);
  }
}