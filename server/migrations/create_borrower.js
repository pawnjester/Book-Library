'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Borrowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booktitle: {
        type: Sequelize.STRING,
        allowNull: false,     
      },
      borrowDate: {
        type: Sequelize.DATE,
        allowNull: false,                
      },
    //   bookId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
        

    // },   
      returnDate: {
      type: Sequelize.DATE,
     },   

      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        unique: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
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
  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Borrowers'),
  };