const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const users = require('./routes/users');

const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect('mongodb://localhost/web_api_authentication')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/api', users);

app.listen(3000, function(){
  console.log('App is now listening on port 3000');
})

mongoose.connection.on('connected', function(){
  console.log('Mongoose is connected');
})

module.exports = app;
