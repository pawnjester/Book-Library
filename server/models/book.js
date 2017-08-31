'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title:{
      type:DataTypes.STRING,
    },
    year:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  });
  //Class Method
  Book.associate = (models) => {
    // Book.hasMany(models.Borrower, {foreignKey: ''})
  }
  return Book;
};