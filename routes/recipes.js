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
                    } else{
                        const recipe = new Recipe({
                            name: req.body.name,
                            description: req.body.description,
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
    });
    
    return router;
};

