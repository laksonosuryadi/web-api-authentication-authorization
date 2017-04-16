var User = require('../models/user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var signup = function(req, res, next) {
  if(req.body.password.length === 0){
    res.send({status: 'fail1'}) //"Password must be filled"
  } else if (req.body.password.length < 6) {
    res.send({status: 'fail2'}) //"Password minimum length is 6 character"
  } else if (req.body.password.length > 9) {
    res.send({status: 'fail3'}) //"Password maximum length is 9 character"
  } else {
    User.create({
      "email": req.body.email,
      "password": passwordHash.generate(req.body.password) //SAVING HASHED PASSWORD TO PASSWORD FIELD IN DB
    }, function(err, user) {
      if(err){
        res.send(err)
      } else {
        res.send(user)
      }
    });
  }
}

var showUsers = function(req, res, next) {
  User.find(function(err, users) {
    if(err) {
      res.send({error: err})
    } else {
      res.send(users)
    }
  });
}

var login = function(req,res) {
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if(err || user == null ){
      res.send({status: 'fail1'})
    } else {
      if(passwordHash.verify(req.body.password, user.password)){
        let token = jwt.sign(
          {
            email: user.email
          },
          process.env.SECRETKEYS
        )
        res.send(token)
      } else {
        res.send({status: 'fail2'})
      }
    }
  })
}

module.exports = {
  signup,
  showUsers,
  login
}
