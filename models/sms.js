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
    }
  }, {});
  sms.associate = function (models) {
    // associations can be defined here
  };
  return sms;
};
