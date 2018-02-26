const User = require('../models/user');

module.exports = ( router ) => {

    router.post('/register', (req, res) =>{
        if(!req.body.email){
            res.json({ success: false, message: "You must provide an e-mail"});
        }
        else if(!req.body.username){
            res.json({ success: false, message: "You must provide a username"});
        }
        else if(!req.body.password){
            res.json({ success: false, message: "You must provide a password"});
        }else{
            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            });
            
            user.save( function (err){
                if (err) {
                    // if(err.code === 11000){
                    //     res.json({ success: false, message: "Email or Username already exists."});
                    // }else{
                        res.json({ success: false, message: "Failed to save user. Error: ", err});
                    // }     
                }else{
                    res.json({ success: true, message: "User saved"});
                }
            });
            res.send("success");
        }
       
    });
    return router;
};