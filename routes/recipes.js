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

    //get all recipe origins and counts
    router.get('/allOrigins', (req, res) => {
        Recipe.find({}, (err, recipes) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if(!recipes) {  //no recipes found
                    res.json({ success: false, message: 'No recipes found' });
                } else {
                    const counts = {};
                    for (let i=0; i<recipes.length; i++){
                        counts[recipes[i].origin] = (counts[recipes[i].origin] || 0) + 1;
                    }
                    const origins = [];
                    for (var key in counts) {
                        if (counts.hasOwnProperty(key)) {
                            let origin = {
                                name: key,
                                count: counts[key]
                            };
                            origins.push(origin);
                        }
                     }
    
                    res.json({ success: true, origins: origins });
                }
            }
        });        
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

    //delete recipe post
    router.delete('/deleteRecipe/:id', (req,res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No Id provided'});
        } else {
            Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid ID' });
                } else {
                    if(!recipe) {
                        res.json({ success: false, message: 'Recipe not found '});
                    } else {
                        //validate user
                        User.findOne({ _id: req.decoded.userId }, (err, user )=> {
                            if (err) {
                                res.json({ success: false , message: err });
                            } else {
                                if(!user) {
                                    res.json({ success: false, message: 'User not found'});
                                } else {
                                    if (user.username !== recipe.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to delete this recipe'});
                                    } else {
                                        recipe.remove((err) => {
                                            if(err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Recipe deleted!' });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    //like recipe post
    router.put('/likeRecipe', (req,res) => {
        if (!req.body.id){     
            res.json({ success: false, message: 'No ID provided' });
        } else {
            Recipe.findOne({ _id: req.body.id }, (err, recipe) => {
                if (err) {
                    res.json({ success: false, message: err});
                } else {
                    if (!recipe) {
                        res.json({ success: false, message: 'Recipe not found'});
                    } else {
                        //validate the user like it != the user who post it
                        User.findOne({ _id: req.decoded.userId }, (err, user)=> {
                            if (err) {
                                res.json({ success: false, message: err});
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'User not found'});
                                } else {
                                    if (user.username === recipe.createdBy) {
                                        res.json({ success: false, message: 'You can not like your own post'});
                                    } else {
                                        //check if user have liked it already
                                        if (recipe.likedBy.includes(user.username)) {
                                            res.json({ success: false, message: 'You already liked the post'});
                                        } else {
                                            //check if user is in the dislike array
                                            if (recipe.dislikedBy.includes(user.username)){ //user disliked before
                                                recipe.dislikes--;
                                                let idx = recipe.dislikedBy.indexOf(user.username);
                                                recipe.dislikedBy.splice(idx, 1);  //remove user from dislikedBy
                                                //add user to likedBy
                                                recipe.likes++;
                                                recipe.likedBy.push(user.username);
                                                recipe.save((err) => {
                                                    if (err){
                                                        res.json({ success: false, message: 'not saved'});
                                                    } else {
                                                        res.json({ success: true, message: 'Recipe liked!'});
                                                    }
                                                });
                                            } else { //user never like/dislike before
                                                recipe.likes++;
                                                recipe.likedBy.push(user.username);
                                                recipe.save((err) => {
                                                    if (err){
                                                        res.json({ success: false, message: 'not saved'});
                                                    } else {
                                                        res.json({ success: true, message: 'Recipe liked!'});
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });


   //dislike recipe post
    router.put('/dislikeRecipe', (req,res) => {
        if (!req.body.id){
            res.json({ success: false, message: 'No ID provided' });
        } else {
            Recipe.findOne({ _id: req.body.id }, (err, recipe) => {
                if (err) {
                    res.json({ success: false, message: err});
                } else {
                    if (!recipe) {
                        res.json({ success: false, message: 'Recipe not found'});
                    } else {
                        //validate the user like it != the user who post it
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err});
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'User not found'});
                                } else {
                                    if (user.username === recipe.createdBy) {
                                        res.json({ success: false, message: 'You can not dislike your own post'});
                                    } else {
                                        //check if user have disliked it already
                                        if (recipe.dislikedBy.includes(user.username)) {
                                            res.json({ success: false, message: 'You already disliked the post'});
                                        } else {
                                            //check if user is in the like array
                                            if (recipe.likedBy.includes(user.username)){ //user liked before
                                                recipe.likes--;
                                                let idx = recipe.likedBy.indexOf(user.username);
                                                recipe.likedBy.splice(idx, 1);  //remove user from likedBy
                                                //add user to dislikedBy
                                                recipe.dislikes++;
                                                recipe.dislikedBy.push(user.username);
                                                recipe.save((err) => {
                                                    if (err){
                                                        res.json({ success: false, message: 'not saved'});
                                                    } else {
                                                        res.json({ success: true, message: 'Recipe disliked!'});
                                                    }
                                                });
                                            } else { //user never like/dislike before
                                                recipe.dislikes++;
                                                recipe.dislikedBy.push(user.username);
                                                recipe.save((err) => {
                                                    if (err){
                                                        res.json({ success: false, message: 'not saved'});
                                                    } else {
                                                        res.json({ success: true, message: 'Recipe disliked!'});
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
};

