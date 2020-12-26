import { Model, DataTypes } from 'sequelize';


export default class SuggestPost extends Model {
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
      modelName: 'SuggestPost',
      tableName: 'suggestposts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    });
  };

  static associate(db) {
    db.Suggest.belongsTo(db.User);
    db.Suggest.hasMany(db.Inquiry);
    db.Suggest.hasMany(db.Image);
    db.Suggest.hasMany(db.Comment);
  };
}