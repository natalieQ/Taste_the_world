var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs'); //package to encrpt password

let emailLengthChecker = (email) => {
    if(!email){
        return false;
    }else{
        if(email.length < 4 || email.length > 30) {
            return false;
        }else{
            return true;
        }
    }
};

const emailValidator = [{
    validator: emailLengthChecker,
    message: "Email must be at least 4 characters but no more than 30"
}];

var userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidator},
    username: {type: String, required: true, unique: true, lowercase: true },
    password: {type: String, required: true}
});

//middleware to encrypt password
userSchema.pre('save', function(next) {
    if(!this.isModified('password')){
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


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);