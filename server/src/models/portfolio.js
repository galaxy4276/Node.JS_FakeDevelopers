import { Model, DataTypes } from 'sequelize';


export default class PortfolioPost extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      modelName: 'PortfolioPost',
      tableName: 'portfolioposts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }

  static associate(db) {
    db.Portfolio.belongsTo(db.User);
    db.Portfolio.hasMany(db.Inquiry);
    db.Portfolio.hasMany(db.Image);
    db.Portfolio.hasMany(db.Comment);
  }
}