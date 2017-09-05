// const chai = require('chai'); 
// const expect = chai.expect;
const expect = require('expect');
const request = require('supertest');
const {User, Book, Borrower} = require('./../models');
const app = require('./../../app');


const beforeany = () => {
  before((done) => {
  User.destroy({
    where: {}, 
    cascade:true,
    truncate:true,
    restartIdentity:true
  });

  Book.destroy({ 
    where: {},
    cascade:true,
    truncate:true,
    restartIdentity:true
  });

  Borrower.destroy({ 
    where: {},
    cascade:true,
    truncate:true,
    restartIdentity:true
  });
  done();
  })  
};

// beforeEach((done) => {
//     User.sequelize.sync({force: true});
//     done();
//   });

describe('Testing All Models', function () {
  beforeany();
  describe("User Model", function() {
    it('It should create a new user', function(done) {   

    User.create({
      username: 'chair',
      email: "chair@example.com",
      password: "chairman",
      isAdmin: true 
    })
    .then((user) => {
      expect(user).toExist();
      expect(user.id).toExist();
      expect(user.id).toBeA('number');
      expect(user.username).toBe('chair');
      expect(user.email).toBe('chair@example.com'); 
      expect(user.isAdmin).toBe(true);           
      done()
    })
    .catch(e => done(e))
  });

  it('should be the class of the created instance', (done) => {
      User.create({
        username: 'chair2',
        password: 'chairman2',
        email: 'chair2@example.com',
        isAdmin: false
      })
      .then((user) => {
        expect(user).toExist();
        expect(user instanceof User).toBe(true);
        expect(user.isAdmin).toBe(false);
        done();
      }).catch((e) => done(e));
    }); 

    it('check if hashed pssword is not the same as the main password', (done) => {
      User.create({
        username: 'chair3',
        password: 'chairman3',
        email: 'chair3@example.com',
        isAdmin: true
      })
      .then((user) => {
        expect(user).toExist();
        expect(user.password).toExist();
        expect(user.password).toNotBe('chairman3');
        done();
      }).catch((e) => done(e));
    }); 

    it('validate Password instance method should be able to detect valid passwords', (done) => {
      User.create({
        username: 'chair4',
        password: 'verybeautiful',
        email: 'chair4@example.com',
        isAdmin: false
      })
      .then((user) => {
        expect(user).toExist();
        expect(user.password).toExist();
        expect(user.validPassword('verybeautiful')).toBe(true);
        done();
      }).catch((err) => done(err));
    });

    it('validate Password instance method should be able to detect invalid passwords', (done) => {
      User.create({
        username: 'chair5',
        password: 'chaining',
        email: 'chair5@example.com',
        isAdmin: false
      })
      .then((user) => {
        expect(user).toExist();
        expect(user.password).toExist();
        expect(user.validPassword('verybeautiful')).toBe(false);
        done();
      }).catch((err) => done(err));
    });

    it('it should not return the password', (done) => {
      User.create({
        username: 'chair6',
        password: 'chaining',
        email: 'chair6@example.com',
        isAdmin: false
      })
      .then((user) => {
        expect(user).toExist();
        expect(user.toJSON().password).toNotExist();        
        done();
      }).catch((err) => done(err));
    });
  })

  describe('Book Model', function() {
    it('it should create a new book ', (done) =>{
      Book.create({
        title: "Oluwapelumi",
        year: 1945,
        author: "Philip",
        count: 2
      })
      .then(book => {
        expect(book.title).toBeA('string');
        expect(book.year).toBeA('number');
        expect(book.author).toBeA('string');
        expect(book.count).toBeA('number');
        expect(book).toExist();
        done();
      }).catch((err) => done(err));
    });

    it('it should check if the new book is an instance of the book model ', (done) =>{
      Book.create({
        title: "Oluwapelumi2",
        year: 1943,
        author: "Philipo",
        count: 3
      })
      .then(book => {        
        expect(book instanceof Book).toBe(true);
        done();
      }).catch((err) => done(err));
    });
  })
})

