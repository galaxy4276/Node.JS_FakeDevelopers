import { Model, DataTypes } from 'sequelize';

export default class Inquiry extends Model {
  static init(sequelize) {
    return super.init({
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      modelName: 'Inquiry',
      tableName: 'inquiries',
      timestamps: false,
      sequelize,
    });
  }

  static associate(db) {
    db.Inquiry.belongsTo(db.Community);
    db.Inquiry.belongsTo(db.Certpost);
    db.Inquiry.belongsTo(db.Donate);
    db.Inquiry.belongsTo(db.Announcement);
    db.Inquiry.belongsTo(db.Award);
    db.Inquiry.belongsTo(db.Portfolio);
    db.Inquiry.belongsTo(db.Suggest);
    db.Inquiry.belongsTo(db.Notice);
  }
}