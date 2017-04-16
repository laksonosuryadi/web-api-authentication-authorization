var mongoose = require('mongoose');
var validators = require('mongoose-validators')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  "email" : {type: String, required: [true, 'email required'], validate: validators.isEmail({message: 'Wrong Email Format'})},
  "password" : {type: String, required: [true, 'password required']}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
