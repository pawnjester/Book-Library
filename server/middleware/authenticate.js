const {User} = require('../models');
const  jwt = require('jsonwebtoken');
// import { User } from '../models';

var authenticate =  (req, res, next) => {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      success: false, 
      message: 'No token provided.'      
    });
  }
  // verifies secret and checks exp
  return jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      return res.json({success: false, message: 'Failed to authenticate token'});
    } 
    else {
      // User.findById(decoded.id).then((user) => {
      //   if(!user) {
      //     return res.status(401).send({
      //       error: 'User could not be verifed. Signup or login first'
      //     })
      //   }
      // })
      req.user = decoded;
      next()
    }
  })
};

var checkAdminStatus = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // verifies secret and checks exp
  return jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      return res.json({success: false, message: 'Failed to authenticate token'});
    } 
    else {
      User.findById(decoded.id).then((user) => {
      if (user.isAdmin === false) {
        return res.status(403).send({
          error: 'Access denied, User is not an admin'
        });
      }
      req.user = user;
      next();
    });
      
    }
  })


}

module.exports = {
  authenticate, checkAdminStatus
  };


