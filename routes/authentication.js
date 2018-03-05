const User = require('../models/user');

module.exports = ( router ) => {

    router.post('/register', (req, res) =>{
        if(!req.body.email){
            res.json({ success: false, message: "You must provide an email"});
        }else{
            if(!req.body.username){
                res.json({ success: false, message: "You must provide an user name"});
            }else{
                if(!req.body.password){
                    res.json({ success: false, message: "You must provide a password"});
                }else{
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username,
                        password: req.body.password
                    });
                    user.save( (err) =>{
                        if (err) {
                            if (err.code === 11000){
                                res.json({ success: false, message: "User name or email already exists" });
                            }else{
                                if (err.errors){
                                    if(err.errors.email){ //email validation err
                                        res.json({ success: false, message: err.errors.email.message });
                                    }else{
                                        if(err.errors.username){ //username validation err
                                            res.json({ success: false, message: err.errors.username.message });
                                        }else{
                                            if(err.errors.password){ //password validation err
                                                res.json({ success: false, message: err.errors.password.message });
                                            }else{ //other err
                                                res.json({ success: false, message: err }); 
                                            }
                                        }
                                    }
                                }else{ //general err
                                    res.json({ success: false, message: "Error saving user. Error: ", err});
                                }
                            }
                        }else{
                            res.json({ success: true, message: "Register Success"});
                        }
                    });
                }
            }
        }
    });

    // Check duplicate email
    router.get('/checkEmail/:email', (req, res) => {
        if(!req.params.email) {
            res.json({ success: false, message: "Email can not be left empty"});
        }else{
            User.findOne({ email: req.params.email}, (err, user) => {
                if(err){
                    res.json({ success: false, message: err });  
                }else{
                    if (user){
                        res.json({ success: false, message: "Email already exists."});
                    }else{
                        res.json({ success: true, message: "Email is available."});
                    }
                }
            });
        }
    });

    // check duplicate username
    router.get('/checkUsername/:username', (req, res) => {
        if(!req.params.username) {
            res.json({ success: false, message: "Username can not be left empty"});
        }else{
            User.findOne({ username: req.params.username}, (err, user) => {
                if(err){
                    res.json({ success: false, message: err });  
                }else{
                    if (user){
                        res.json({ success: false, message: "Username already exists."});
                    }else{
                        res.json({ success: true, message: "Username is available."});
                    }
                }
            });
        }
    });

    return router;
};

