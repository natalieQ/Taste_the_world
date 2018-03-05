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
    return router;
};

