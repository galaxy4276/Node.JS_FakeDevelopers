import { Model, DataTypes } from 'sequelize';


export default class DonatePost extends Model {
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
      modelName: 'DonatePost',
      tableName: 'donateposts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }

  static associate(db) {
    db.Donate.belongsTo(db.User);
    db.Donate.hasMany(db.Inquiry);
    db.Donate.hasMany(db.Image);
    db.Donate.hasMany(db.Comment);
  }
}