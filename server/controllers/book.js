const Book =  require('../models').Book
const User =  require('../models').User
const Borrower =  require('../models').Borrower


module.exports = {
  addNewBook(req, res) {
    const title = req.body.title;
    const author = req.body.author;    
    
    if(!title) {
      res.status(400).send({error: "The title cannot be empty"})
    }else if(!author) {
      res.status(400).send({error: "The author field cannot be empty"})
    }

    Book.findOne({
      where: {
        title: req.body.title,
        author: req.body.author,
      }
    })
    .then(book => {
      //if the book already exists, then update
      if(book) {
        book.update({
          count: book.count + 1,
        })
        .then(book => {
          res.status(200).send({message: "Book added ", book})
        })        
      }
      else {
        Book.create({
          title: req.body.title,
          author: req.body.author,
          year: req.body.year,
          count: req.body.count,
        })
        .then(newBook => {
          newBook.update({
            count: newBook.count + 1
          })
          .then((newBook) => {
          res.status(200).send({statusCode: 200, newBook})           
        })
        })
        .catch(error => res.status(400).send(error))
      }
    })
    .catch(e => res.status(400).send(e));    
  },

  modifyBook(req, res) {
    const bookId = req.params.bookId;

    Book.findById(bookId)
    .then(book => {
      if(!book) {
        return res.status(404).send({
          message: 'Book not Found!'
        });
      }
      return book
      .update({
        title:req.body.title || book.title,
      })
      .then(() => res.status(200).send(book)) //send the updated book
      .catch((error) => res.status(400).send(error))
    })
    .catch((error) => res.status(400).send(error))
    
  },

  getAllBooks(req, res) {
    Book.findAll()
    .then(books =>{
      if (books.length === 0) {
        return res.status(200).send({})
      }
      res.status(200).send(books)
    }) 
    .catch(e => res.status(400).send(e))
  },

  BorrowBooks(req, res) {
    Book.findOne({
      where: {
        title: req.body.booktitle,
        author: req.body.author,
      }
    })
    .then(book => {
      if(!book) {
        res.status(404).send({message: "Book not found!"})
      }
      else {
        return Borrower
    .create({
      booktitle: req.body.booktitle,
      borrowDate: Date.now(),
      returnDate: null,
      userId: req.params.userId,
      // bookId: Borrower.id
    })
    .then(borrower => {
      res.status(200).send(borrower)
      book.update({
          count: book.count -1,
        });
    })
    .catch((e) =>{
      return res.status(400).send(e)
    })                
      }
    });   
  },

  returnBooks(req, res) {
    Book.findOne ({
      where: {
        title: req.body.title,
        author: req.body.author,
      }
    })
    .then((book) => {
      if(!book) {
        return res.status(400).send({message: "There is no book like that!"})        
      }
      else {  
        const use =  req.params.userId;
           
        Borrower.findOne({
          where: {            
            returnDate : null,
            booktitle: req.body.title,
            userId: use
          }
        })
        .then((returnedBook) => {
          if(returnedBook) {
             book.update({
               count: book.count + 1,
              })
              returnedBook.update({
                returnDate: Date.now()
              })
              .then(() => res.status(200).send({message: "book successfully returned", returnedBook}))
            }
            // else if (!returnedBook.userId == req.params.userId){
            //   return res.status(400).send({message: "This book was not borrowed by this user"})
            // }            
          else{
            return res.status(400).send({message: "The book has been returned"})
          }                
        })
        .catch(e => {return res.status(400).send(e.message)})
      }
    })       
  },

  getUserBooksBorrowedNotReturned (req, res) {
    if(req.query.returned === 'false') {
      Borrower.findAll({
        where: {          
          userId:  req.params.userId,
          returnDate: null,
        }
      })
      .then(notReturnedBooks => {
        res.status(200).send(notReturnedBooks)
      })

    } else {
      res.status(200).send({})
    }  
  }, 

  deleteBooks(req, res) {
    Book.findOne({
      where: {
        title: req.body.booktitle, 
        author: req.body.author,       
      }
    })
    .then((book)=> {
      book.destroy();
    })
  }
}