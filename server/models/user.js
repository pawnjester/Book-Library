'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,      
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true } },
    password: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false      
    }
  });

  //salt and hash passwords before creating users 
  User.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});


  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  //Instance method to generate token for the user
  User.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({id: user.id, access},
     process.env.SECRET_KEY,
     { expiresIn: Math.floor(new Date().getTime()/1000) + 7*24*60*60 }).toString();    
    return token;

  }

  // Instance method to prevent password from
  // being sent to client.
  User.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  //Class Method
  User.associate = (models) => {
    User.hasMany(models.Borrower, {foreignKey: 'userId'})
  }
  return User;
};