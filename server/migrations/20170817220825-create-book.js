'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      year:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Books'),
  
};