import { Model, DataTypes } from 'sequelize';

export default class Admin extends Model {
  static init(sequelize) {
    return super.init({
      admin_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize
    });
  }
}