import { Model, DataTypes } from 'sequelize';


export default class User extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.STRING(35),
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {  
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      hash: {
        type: DataTypes.STRING(200),
        allowNull: true,
      }
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true,
      sequelize,
    });
  }

  static associate(db) {
    db.User.hasMany(db.Announcement);
    db.User.hasMany(db.Award);
    db.User.hasMany(db.Certpost);
    db.User.hasMany(db.Community);
    db.User.hasMany(db.Donate);
    db.User.hasMany(db.Portfolio);
    db.User.hasMany(db.Suggest);
    db.User.hasMany(db.Notice);
    db.User.hasMany(db.Comment);
  }
}