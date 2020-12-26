import { Model, DataTypes } from 'sequelize';


export default class CertPost extends Model {
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
      modelName: 'CertPost',
      tableName: 'certposts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }
  
  static associate(db) {
    db.Certpost.belongsTo(db.User);
    db.Certpost.hasMany(db.Inquiry);
    db.Certpost.hasMany(db.Image);
    db.Certpost.hasMany(db.Comment);
  }
}