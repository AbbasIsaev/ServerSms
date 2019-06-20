'use strict';
module.exports = (sequelize, DataTypes) => {
  const sms = sequelize.define('sms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isSent: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    dateSent: {
      type: DataTypes.DATE
    },
    userId: {
      ref: "users",
      type: DataTypes.INTEGER
    }
  }, {});
  sms.associate = function (models) {
    // associations can be defined here
    sms.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user'
    });
  };
  return sms;
};
