const Sequelize = require('sequelize');
const db = require('./db');


const User = db.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  },
  {
    freezeTableName: true,
  });

module.exports = User;