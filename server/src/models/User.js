export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
      timestamps: true,
    });

    User.associate = (db) => {
      db.User.hasMany(db.Certpost);
      db.User.hasMany(db.Suggest);
      db.User.hasMany(db.Donate);
      db.User.hasMany(db.Award);
      db.User.hasMany(db.Portfolio);
    }

    return User;
}
