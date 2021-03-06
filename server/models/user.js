const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

/*
 Email
  passcode
  Tokens-[{access,token}]
 */
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.to12JSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};


/*UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
}; */

    UserSchema.methods.generateAuthToken = function(){
      
      var user = this;
      var access = 'auth';
      var token = jwt.sign({_id:user._id.toHexString() , access},'bharth4d9').toString();
        console.log(`tokenID: ${token}`);
      user.tokens.push({
        access,
        token
      });
      return user.save().then(()=>{
     return token;
    });
  };
  //******* find by token ********
  UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
  
    try {
      decoded = jwt.verify(token, 'bharth4d9');
    } catch (e) {
      return Promise.reject();
    }
  
    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  };
  var User = mongoose.model('User', UserSchema);

module.exports = {User}

