var jwt = require('jsonwebtoken')
var User = require('../models/user')
require('dotenv').config()

module.exports = {
  isLoggedIn: function(req,res, next) {
    jwt.verify(req.headers.token, process.env.SECRETKEYS, function (err, decoded) {
        if(decoded) {
          User.findOne({email: decoded.email}, function(err, result) {
            if(err || result == null) {
              res.send(err)
            } else {
              next()
            }
          })
        } else {
          res.send(err);
        }
      })
  }
};
