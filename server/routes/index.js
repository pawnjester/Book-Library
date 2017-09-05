const userController = require('../controllers').users;
const bookController = require('../controllers').books;
const {authenticate, checkAdminStatus} = require ('../middleware/authenticate');

const {sessionChecker, 
  checkIfUserExists, 
  CheckIfUserIsSigned, CheckIfBookIsAlreadyBorrowed, CheckBookCount} = require('../middleware/sessions');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Hello Books API!',
  }));

  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);
  app.get('/api/getUser/', authenticate, userController.getMe);
  app.get('/api/users/logout', userController.logout);
  app.post('/api/books', authenticate, checkAdminStatus,bookController.addNewBook);    
  app.put('/api/books/:bookId', authenticate, checkAdminStatus, bookController.modifyBook); 
  app.get('/api/books', authenticate, bookController.getAllBooks);
  app.get('/api/users/:userId/books', authenticate,checkIfUserExists, bookController.getUserBooksBorrowedNotReturned);    
  app.post('/api/users/:userId/books', checkIfUserExists, authenticate, CheckBookCount,CheckIfBookIsAlreadyBorrowed, 
  bookController.BorrowBooks); 
  app.put('/api/users/:userId/books', checkIfUserExists, authenticate,bookController.returnBooks);   
   
  
}
