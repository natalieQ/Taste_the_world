const User = require('../models/user');
const Recipe = require('../models/recipe');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = ( router ) => {
    
    router.post('/newRecipe', (req,res) => {
        if (!req.body.name) {
            res.json({ success: false, message: 'Recipe name is required' });
        } else {
            if(!req.body.description) {
                res.json({ success: false, message: 'Recipe description is required' });
            }else{
                if(!req.body.origin) {
                    res.json({ success: false, message: 'Recipe origin is required' });
                } else {
                    if(!req.body.createdBy) {
                        res.json({ success: false, message: 'Recipe owner is required' });
                    } else {
                        if (!req.body.imagePath) {
                            res.json({ success: false, message: 'Recipe image is required' });
                        } else {
                            const recipe = new Recipe({
                                name: req.body.name,
                                description: req.body.description,
                                imagePath: req.body.imagePath,
                                origin: req.body.origin,
                                createdBy: req.body.createdBy
                            });
                            recipe.save( (err) => {
                                if(err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'new recipe posted!' });
                                }

                            });
                        }
                    } 
                }
            }
        }
    });

    // get all recipes from database
    router.get('/allRecipes', (req, res) => {
        Recipe.find({}, (err, recipes) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if(!recipes) {  //no recipes found
                    res.json({ success: false, message: 'No recipes found' });
                } else {
                    res.json({ success: true, recipes: recipes });
                }
            }
        }).sort({ '_id': -1 }); //sort by created time, put newest one on the top
    });
    
    //get single recipe by id (for udpate)
    router.get('/singleRecipe/:id',(req,res) => {
        //search for the recipe
        if (!req.params.id) {
            res.json({ success: false, message: 'No recipe ID was provided' })
        } else {
            Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
                if (err) {
                    res.json({ success: false, message: 'Recipe ID not valid' });
                } else {
                    if(!recipe) {
                        res.json({ success: false, message: 'Recipe not found' });
                    } else { 
                        //verify if the recipe to be updated is created by the original owner
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: 'User ID not valid'});
                            } else {
                                if(!user) {
                                    res.json({ success: false, message: 'User not found'});
                                } else {
                                    if (user.username !== recipe.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this recipe'});
                                    } else { //send recipe to frontend
                                        res.json({ success: true, recipe: recipe });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
        
    });

    //save updated recipe to database
    router.put('/updateRecipe', (req, res) => {
        if (!req.body._id){
            res.json({ success: false, message: 'No recipe ID provided'});
        } else {
            Recipe.findOne({ _id: req.body._id }, (err, recipe) => {
                if (err) {
                    res.json({ success: false, message: 'Recipe ID not valid'});
                } else{
                    if (!recipe) {
                        res.json({ success: false, message: 'Recipe not found'});
                    } else {
                        //verify if the recipe to be updated is created by the original owner
                        User.findOne({ _id: req.decoded.userId }, (err,user) => {
                            if (err) {
                                res.json({ success: false, message: 'User ID not valid'});
                            } else {
                                if(!user) {
                                    res.json({ success: false, message: 'User not found'});
                                } else {
                                    if (user.username !== recipe.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this recipe'});
                                    } else {
                                        recipe.name = req.body.name;
                                        recipe.description = req.body.description;
                                        recipe.imagePath = req.body.imagePath;
                                        recipe.origin = req.body.origin;
                                        recipe.save((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Recipe post updated!!!'});
                                            }
                                        })
                                    }
                                }
                            }
                        });
                        
                    }
                }
            });
        }
    })


    return router;
};

