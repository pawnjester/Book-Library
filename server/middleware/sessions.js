const {User, Borrower, Book} = require('../models')

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (!req.session.user && !req.cookies.user_sid) {
        res.status(400).send({error: 'You need to sign in first'});
    } else {
        next();
    }    
};

var CheckIfUserIsSigned = (req, res, next) => {
  if(req.session.user && req.cookies.user_sid) {
    res.status(400).send({error: 'You have already logged in'})
  }
  else {
    next();
  }
};

var checkIfUserExists = (req, res, next) => {
  User.findOne({
    id: req.params.userId,
  })
  .then((user) =>{
    if(!user) {
      return res.status(500).send("User does not exist")
    }
    else {
      next();
    }
  })
};

var CheckIfBookIsAlreadyBorrowed = (req, res, next) => {
  Borrower.findOne({
    where: {
      booktitle: req.body.booktitle,
      returnDate: null,
      userId: req.params.userId
    }
  })
  .then(book => {
    if (book) {
      return res.status(400).send({message: "User already borrowed this book"})
    }       
    else {
      next(); 
    }
  })
};


var CheckBookCount = (req, res, next) => {
  Book.findOne({
    where: {
      title: req.body.booktitle,
      count: {
        $gt: 0,
      }
    }
  })
  .then(book => {
    if(!book) {
      res.status(400).send({message: "This book is out of stock right now!"})
    }
    else { 
      next();
    }
    
  })
};



module.exports = {
  sessionChecker, checkIfUserExists, CheckIfBookIsAlreadyBorrowed, 
  CheckIfUserIsSigned,
   CheckBookCount, 
  
  };