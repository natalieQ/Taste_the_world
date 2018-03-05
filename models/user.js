var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs'); //package to encrpt password

//check email length
let emailLengthChecker = (email) => {
    if(!email){
        return false;
    }else{
        if(email.length < 6 || email.length > 30) {
            return false;
        }else{
            return true;
        }
    }
};

//check email format
let validEmailChecker = (email) => {
    if(!email){
        return false;
    }else{
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email); 
    }
}

//check user name length
let usernameLengthChecker = (username) => {
    if(!username){
        return false;
    }else{
        if(username.length < 4 || username.length > 15) {
            return false;
        }else{
            return true;
        }
    }
}

//check username format
let validUsernameChecker = (username) => {
    if(!username){
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username); 
    }
}

// check password length
let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 6 || password.length > 20) {
            return false; 
         } else {
            return true;
        }
    }
};
  
  // check password format
  let validPasswordChecker = (password) => {
    if (!password) {
        return false; 
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
};

//email validators
const emailValidator = [{
        validator: emailLengthChecker,
        message: "Email must be at least 6 characters but no more than 30."
    },
    {
        validator: validEmailChecker,
        message: "Email you provided is not valid."
    }
];

//username validators
const usernameValidators = [
    {
      validator: usernameLengthChecker,
      message: 'Username must be at least 4 characters but no more than 15'
    },
    {
      validator: validUsernameChecker,
      message: 'Username can not contain special characters'
    }
];

// password validator
const passwordValidators = [
    {
      validator: passwordLengthChecker,
      message: 'Password must be at least 6 characters but no more than 20'
    },
    {
      validator: validPasswordChecker,
      message: 'password must have at least one uppercase, lowercase, special character, and number'
    }
];

var userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidator},
    username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
    password: {type: String, required: true, validate: passwordValidators}
});

//middleware to encrypt password
userSchema.pre('save', function(next) {
    if(!this.isModified('password')){ //if not modified, dont run the middleware
        return next();
    }
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err){
            return next(err);
        }
        this.password = hash;
        next();
    });
});

//dehash password
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);