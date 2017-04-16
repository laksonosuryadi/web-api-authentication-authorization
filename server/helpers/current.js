var jwt = require('jsonwebtoken')
//var User = require('../models/user')
require('dotenv').config()

module.exports = {
  showCurrentUser: function(req,res, next) {
    jwt.verify(req.headers.token, process.env.SECRETKEYS, function (err, decoded) {
        if(decoded) {
          if(err) {
            res.send(err)
          } else {
            res.send(decoded.email)
          }
        } else {
          res.send({status: 'fail'});
        }
      })
  }
};
