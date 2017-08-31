'use strict';
module.exports = (sequelize, DataTypes) => {
  const Borrower = sequelize.define('Borrower', {
    booktitle:{
      type:DataTypes.STRING,
    },
    borrowDate:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    returnDate: {
      type: DataTypes.DATE,
    },

    // bookId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
            
    // },
        
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  //Class Method
  Borrower.associate = (models) => {
    Borrower.belongsTo(models.User, {foreignKey: 'userId'})
  }
  return Borrower;
};