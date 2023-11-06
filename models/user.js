'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        as: "order",
        foreignKey: "userId"
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
     type: DataTypes.STRING,
     unique: true,
     validate: {
      notEmpty: true,
      isEmail: true
     }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8
      }
    },
    admin: {
     type: DataTypes.BOOLEAN,
     defaultValue: false
    }
  },
   {
    sequelize,
    modelName: 'User',
  });
  return User;
};