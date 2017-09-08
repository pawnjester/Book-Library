// import {User} from '../models';
const {User} =  require('../models');

module.exports = {
  signup(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if(!username) {
      return res.status(400).send({error: "You need to fill in your username"}) 
    }else if(!email) {
      return res.status(400).send({error:"You need to fill in your email"})
    }else if(!password) {
      return res.status(400).send({error: "You need to fill in your password"})
    }

    return User.findOne({
      where: {
        username,
      }
    })
    .then (user => {
      if(user) {
        return res.status(400).send({error: 'Username already taken'})
      }
      return User.create({
      username,
      email,
      password,
      isAdmin: req.body.isAdmin,
      })
      .then((user) =>
       {      
        const token = user.generateAuthToken();
        return res.header('x-auth', token).status(201)
        .send({
          message: `Welcome ${user.username}`,
          user
        });      
      })
    .catch((error) => { return res.status(400).send(`${error.errors[0].message}`)})  
  })  
  },
 

  signin(req, res) {

    const username = req.body.username.toLowerCase().trim();
    // const email = req.body.email.trim();

    if(!username) {
      return res.status(401)
      .send({
        status: false, 
        error: "Username cannot be empty"
        });
    } 
    else if (!req.body.password) {
      return res.status(401)
      .send({
        status: false,
        error: "Password field cannot be empty"
        });
    }
    User.findOne({
      where: {
        username,
      }
    })
    .then((user) =>{     
      
      if(!user) {
        return res.status(401).send({message: "User is not registered"})
      }
      else if(!user.validPassword(req.body.password)){
        return res.status(401)
        .send({
          message: "The password is incorrect"
        })
      }
            
      const token = user.generateAuthToken();
      res.header('x-auth', token).status(200).send({
      statusCode: 200,
      message: `Welcome back, ${user.username}`,
      user
    });
      
    })
    .catch(error => {return res.status(400).send(error)})
  },

   getMe (req, res) {
  const currentUser = req.user;
  if (!currentUser) {
    return res.status(401).send({
      error: 'Not logged in'
    });
  }
  return res.status(200).send({ currentUser });
  },

  logout(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid'); 
        return res.status(200).send({message: "User has logged out"});       
    } else {
        return res.status(400).send({message: "You need to log in first"});
    }    
  }
}
