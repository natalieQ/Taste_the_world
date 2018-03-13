var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

//check recipe name length
let nameLengthChecker = (name) => {
    if(!name){
        return false;
    }else{
        if(name.length < 3 || name.length > 50) {
            return false;
        }else{
            return true;
        }
    }
};

//check recipe name format
let alphaNumericNameChecker = (name) => {
    if(!name){
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(name); 
    }
}

//check description length
let descriptionLengthChecker = (description) => {
    if(!description){
        return false;
    }else{
        if(description.length < 5 || description.length > 500) {
            return false;
        }else{
            return true;
        }
    }
}


// recipe name validators
const nameValidators = [{
        validator: nameLengthChecker,
        message: "Recipe name must be at least 3 characters but no more than 50."
    },
    {
        validator: alphaNumericNameChecker,
        message: "Recipe name can not contain special characters"
    }
];

// recipe description validators
const descriptionValidators =[
    {
      validator: descriptionLengthChecker,
      message: 'description must be at least 5 characters but no more than 500'
    }
];



var recipeSchema = new Schema({
    name: { type: String, required: true, validator: nameValidators },
    description: { type: String, validator: descriptionValidators },
    origin: { type: String, required: true },
    imagePath: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array }
});

module.exports = mongoose.model('Recipe', recipeSchema);