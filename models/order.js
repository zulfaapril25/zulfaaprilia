'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        as: "user", 
        foreignKey: "userId"
      }),

      Order.belongsTo(models.Book, {
        as: 'book',
        foreignKey: "bookId"
      }),
      Order.hasOne(models.Transaction, {
        as: 'transaksi',
        foreignKey: 'orderId'
      })
    }
  }
  Order.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    bookId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      max: 255
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};