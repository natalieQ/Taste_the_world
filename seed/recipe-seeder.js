const Recipe = require('../models/recipe');
const mongoose = require('mongoose');
const config = require('./config/database');

//database config
mongoose.Promise = global.Promise;
mongoose.connect(config.url, (err) => {
    if (err){
        console.log('NOT able to connect to database: ', err);
    }else{
        console.log('Successfully connected to database: ' + config.db);
    }
});

var recipes = [
    new Recipe({
        itemPath: 'https://getfrenchbox.com/wp-content/uploads/2015/06/french-box-truffles-chocolate-1024x683.jpg',
        itemId: 1,
        itemName: 'Chocolate Truffle',
        description: ' is a type of chocolate confectionery, traditionally made with a chocolate ganache centre coated in chocolate, cocoa powder or chopped toasted nuts (typically hazelnuts, almonds, or coconut), usually in a spherical, conical, or curved shape.',
        price: 3,
        quantityInStock: 100
    }),
    
];
var done = 0;
for(var i=0; i<recipes.length; i++){
    recipes[i].save(function(err,res){
        if(err){
            console.log(err);
        }
        done++;
        if(done === recipes.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}