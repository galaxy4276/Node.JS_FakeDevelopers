import { Model, DataTypes } from 'sequelize';


export default class AwardPost extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      
    }, {
      modelName: 'AwardPost',
      tableName: 'awardposts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }

  static associate(db) {
    db.Award.belongsTo(db.User);
    db.Award.hasMany(db.Inquiry);
    db.Award.hasMany(db.Image);
    db.Award.hasMany(db.Comment);
  }
}