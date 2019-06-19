'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    googleId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
