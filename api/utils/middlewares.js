const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  // Once the password is encrypted using bcrypt, you'll need to save the user the DB.
  // Once the user is set, take the savedUser and set the returned document from Mongo on req.user
  // call next to head back into the route handler for encryptUserPW

  if(!password) {
    res.status(422).json({err: 'What is the airspeed velocity of an unladen swallow?'})
    return;
  };
  bcrypt
    .hash(password, SaltRounds) 
    .then(pw => {
      req.password = pw;
      next();
    })
    .catch(err => {
      throw new Error(err);
    });
  };

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();
  if(!username) {
    res.status(422).json({err: 'Halt! Who goes there?'});
    return;
  }
  User.findOne({username}, (err, user) => {
    if(!user) {
      res.status(422).json({err: 'I think therefore I am, user does not exist'});
    };
  const hashedPass = user.password;
  bcrypt
    .compare(password, hashedPass)
    .then(response => {
      if (!response) throw new Error(err);
      req.username = user.username;
      next();
    })
    .catch(err => {
      res.status(422).json({err: 'Somethings not quite right here...Try again!'});
    });
  });
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
