import { Model, DataTypes } from 'sequelize';


export default class Notice extends Model {
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
      modelName: 'Notice',
      tableName: 'notices',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }
  
  static associate(db) {
    db.Notice.belongsTo(db.User);
    db.Notice.hasMany(db.Inquiry);
    db.Notice.hasMany(db.Image);
    db.Notice.hasMany(db.Comment);
  }
}