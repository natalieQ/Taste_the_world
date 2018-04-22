const Recipe = require('../models/recipe');
const mongoose = require('mongoose');
const config = require('../config/database');

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
        name: 'Ginger Scallion Ramen Noodles',
        description: 'The noodles are just a vessel for this savory, gingery, simple weeknight sauce. Double the batch, and you’ll always have a way to brighten up simple grilled or pan-roasted chops, roasted veggies, or grain bowls.',
        origin: 'China',
        imagePath: 'https://assets.bonappetit.com/photos/5a0de2036a0d9a7cf8e46ccd/1:1/w_768,h_768,c_limit/healthyish-scallionnoodlebowl-horizontal.jpg',
        createdBy: 'Alice',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Pupusas',
        description: 'Once you taste this classic Salvadoran dish, you’ll definitely want to experiment with the fillings. Try them with carnitas, or even a combination of all three (beans, cheese, and meat).',
        origin: 'El Salvador',
        imagePath: 'https://assets.bonappetit.com/photos/58e29a4f8f4c125ce35a1301/1:1/w_768,h_768,c_limit/0417-web-pupusa-beauty.jpg',
        createdBy: 'Nancy',
        likes: 3,
        likedBy: ['Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Spaghetti Aglio e Olio',
        description: 'You will think this pasta recipe calls for an absurd amount of kale, but it will shrink a ton when cooked.',
        origin: 'Italy',
        imagePath: 'https://assets.bonappetit.com/photos/58700a2f725909250df59f9c/16:9/w_767,c_limit/spaghetti-aglio-e-olio-with-lots-of-kale.jpg',
        createdBy: 'Harry',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Butter Chicken',
        description: 'Butter chicken was reportedly developed in the early 20th century in Delhi as a way to use leftover tandoori chicken so that the dried out chicken pieces can be softened with tomatoes, butter, and cream. Butter chicken is usually creamier, while chicken tikka masala, which was developed in the UK, tends to be spicier..',
        origin: 'India',
        imagePath: 'https://assets.bonappetit.com/photos/589e297b476e2c92337165bb/16:9/w_767,c_limit/butter-chicken.jpg',
        createdBy: 'Lau',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Chicken Scarpariello with Sausage',
        description: 'Chicken Scarpariello is a classic Italian-American recipe with juicy chicken thighs, sweet Italian sausage, and a vinegary, sweet-sour pan sauce. For that sauce, we liked the flavor of the Peppadew, but other pickled peppers will work, too. Keep in mind that you may have to add a little more sugar or vinegar if you use another type of pepper—taste at the end and tweak it to your liking.',
        origin: 'United States',
        imagePath: 'https://assets.bonappetit.com/photos/59c94a8f3b3bf713cb63808f/16:9/w_767,c_limit/chicken-scarpariello.jpg',
        createdBy: 'Lau',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Summer Squash and Basil Paster',
        description: 'Sautéed squash eventually gets jammy and saucy if cooked long enough, ideal as a way to coat big pieces of pasta.',
        origin: 'Italy',
        imagePath: 'https://assets.bonappetit.com/photos/59148a8d54d3034466bd4bd5/16:9/w_767,c_limit/summer-squash-and-basil-pasta.jpg',
        createdBy: 'Vivian',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'One-Skillet Steak and Spring Veg',
        description: 'SThis mustard sauce is meant to have some zing, but if you want less heat, swap smoked paprika for the cayenne.',
        origin: 'China',
        imagePath: 'https://assets.bonappetit.com/photos/5a1f02dd2479441876ab998b/16:9/w_767,c_limit/Steak%20Skillet%20Peas%20Asparagus%20Beauty%2032.jpg',
        createdBy: 'Lisa',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Chicken Escabèche',
        description: 'You know what your Tuesday-night chicken wants? An irresistible tangy-sweet bath.',
        origin: 'Spain',
        imagePath: 'https://assets.bonappetit.com/photos/598c8da4bfbac62dff7ef77e/16:9/w_767,c_limit/chicken-escabeche.jpg',
        createdBy: 'Todd',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Rose-Aperol Spritz',
        description: 'Look for the passion fruit juice in the boxed juice section of your grocery store—our favorite brand is Ceres. It’s got the perfect sweet-sour flavor to bridge the gap between the fruity wine and slightly bitter Aperol.',
        origin: 'United States',
        imagePath: 'https://assets.bonappetit.com/photos/59149ef71e10dc118345a5c3/16:9/w_767,c_limit/rose-aperol-spritz.jpg',
        createdBy: 'Laura',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Beef Empanadas',
        description: 'There are as many variations of empanadas as there are cooks in Argentina. This version was developed by BA contributor Gaby Melian, who is from Buenos Aires and was taught as a little girl by family members how to make them. After years of perfecting her method, she prefers the empanadas baked, not fried, and the addition of green olives and raisins in the filling is essential.',
        origin: 'Argentina',
        imagePath: 'https://assets.bonappetit.com/photos/58a34e1df12ac6e639bf24ae/16:9/w_767,c_limit/argentinian-beef-empanadas.jpg',
        createdBy: 'Abby',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Shrimp Scampi',
        description: 'We urge you: don’t skip the marinade step—it really gives the shrimp lots of garlicky flavor and sets this apart from other scampi recipes.',
        origin: 'Spain',
        imagePath: 'https://assets.bonappetit.com/photos/58a4e12a9fda6d7fbc740e91/16:9/w_767,c_limit/shrimp-scampi.jpg',
        createdBy: 'Murray',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Bob Armstrong Chile con Queso',
        description: 'The signature dish at Matt’s El Rancho in Austin, Texas, named after former Texas land commissioner Bob Armstrong, who one day asked them to make him “something different.” What resulted was a now-legendary layered dip of taco meat, queso, guacamole, sour cream, and pico de gallo. Important: Dont used aged or extra-sharp cheddar, which is drier and doesnt melt smoothly.',
        origin: 'United States',
        imagePath: 'https://assets.bonappetit.com/photos/5877a6ccc4e65c287be39e0a/16:9/w_767,c_limit/bob-armstrong-chile-con-queso.jpg',
        createdBy: 'Potter',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Brown Butter and Toffee Chocolate Chip Cookies',
        description: 'Using chocolate wafers instead of chips is a cookie game-changer. They spread as they melt, creating thin pockets of chocolate in each layer, and stay much softer at room temperature.',
        origin: 'United States',
        imagePath: 'https://assets.bonappetit.com/photos/58e2844b65366d7ba90812ea/16:9/w_1028,c_limit/0417-Brown-Butter-Toffee-ChocolateChip%20Cookie-group.jpg',
        createdBy: 'Harry',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Better-than-Takeout Stir-Fried Udon',
        description: 'You can easily make this vegetarian—omit the pork and sub in 8 oz. shiitake or crimini mushrooms.',
        origin: 'Japan',
        imagePath: 'https://assets.bonappetit.com/photos/58c2c2bcb1bf59134d606c65/16:9/w_1028,c_limit/0317-ba-basics-stir-fried-udon-15.jpg',
        createdBy: 'Harry',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'No-Fail Roast Chicken with Lemon and Garlic',
        description: 'This recipe eliminates one of the most common complaints about whole roast chickens—that it’s hard to know when they’re cooked all the way through.',
        origin: 'Morocco',
        imagePath: 'https://assets.bonappetit.com/photos/5a8749c98e5ab504d767b208/16:9/w_767,c_limit/no-fail-roast-chicken-with-lemon-and-garlic.jpg',
        createdBy: 'Harry',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),
    new Recipe({
        name: 'Jammy Soft-Boiled Eggs',
        description: 'To make these soft-boiled eggs, you dont have to wait for them to come to room temperature. Go ahead and cook them straight out of the fridge. ',
        origin: 'United States',
        imagePath: 'https://assets.bonappetit.com/photos/58c95c88aafcc51ad9a32bc9/16:9/w_1028,c_limit/jammy-soft-boiled-eggs.jpg',
        createdBy: 'Harry',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),  
    new Recipe({
        name: 'BAs Best Chicken and Dumplings',
        description: 'To make these soft-boiled eggs, you dont have to wait for them to come to room temperature. Go ahead and cook them straight out of the fridge. ',
        origin: 'China',
        imagePath: 'https://assets.bonappetit.com/photos/58a35448476e2c92337165d3/16:9/w_1028,c_limit/bas-best-chicken-and-dumplings.jpg',
        createdBy: 'Bobby',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),  
    new Recipe({
        name: 'One-Skillet Chicken with Buttery Orzo',
        description: 'Why use a bunch of pots and pans when fennel, orzo, and chicken can be cooked in one?',
        origin: 'France',
        imagePath: 'https://www.bonappetit.com/recipe/one-skillet-chicken-with-buttery-orzo',
        createdBy: 'Bobby',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),  
    new Recipe({
        name: 'Moon Milk',
        description: 'In Ayurveda (one of the oldest systems of natural healing in the world), warm milk is a common remedy for sleeplessness.',
        origin: 'India',
        imagePath: 'https://assets.bonappetit.com/photos/58791b880d1bcb166daea5c0/16:9/w_1028,c_limit/moon-milk.jpg',
        createdBy: 'Moon',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),  
    new Recipe({
        name: 'Morning Buns',
        description: 'Too many morning buns for your crowd? This recipe halves easily. This is part of BAs Best, a collection of our essential recipes.',
        origin: 'Germany',
        imagePath: 'https://assets.bonappetit.com/photos/58ef9815f9ef2707d8e770af/16:9/w_1028,c_limit/morning-buns.jpg',
        createdBy: 'Cindy',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    }),  
    new Recipe({
        name: 'Ooey Gooey Butter Cake',
        description: 'This cake is a legendary Depression-era mistake.',
        origin: 'Greece',
        imagePath: 'https://assets.bonappetit.com/photos/58b705c4f759ff7d01f5a0c0/16:9/w_1028,c_limit/nostalgia-week-ooey-gooey-butter-cake-buttercake.jpg',
        createdBy: 'Hayley',
        likes: 4,
        likedBy: ['Mike', 'Alex', 'Susan', 'James'],
        dislikes: 2,
        dislikedBy: ['Olivia','Emma']
    })
];
var done = 0;
for(var i=0; i<recipes.length; i++){
    recipes[i].save(function(err,res){
        if(err){
            console.log(err);
        }
        done++;
        if(done === recipes.length){
            console.log('Saved all recipes to database')
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}