'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.DM, {
        foreignKey: 'fromId',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.DM, {
        foreignKey: 'toId',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Task, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    linkedIn: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    aboutMe: DataTypes.STRING,
    image: DataTypes.BLOB,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    interests: DataTypes.STRING,
    verified_users: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
