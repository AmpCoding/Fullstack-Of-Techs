'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DM.belongsTo(models.User, {
        foreignKey: 'fromId',
        onDelete: 'CASCADE'
      })
      DM.belongsTo(models.User, {
        foreignKey: 'toId',
        onDelete: 'CASCADE'
      })
    }
  }
  DM.init({
    toId: DataTypes.INTEGER,
    fromId: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DM',
  });
  return DM;
};
