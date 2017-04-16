var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var Check = require('../helpers/authentication')
var Current = require('../helpers/current')

router.get('/', function(req, res) {
  res.send('testing connnection success')
})

router.post('/signup', usersController.signup)
router.get('/users', Check.isLoggedIn, usersController.showUsers)
router.post('/login', usersController.login)
router.get('/current', Current.showCurrentUser)

module.exports = router;
