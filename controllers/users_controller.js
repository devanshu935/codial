const User = require('../models/user');

module.exports.profile = async function(req, res){
    if (req.cookies.user_id){
        try{
            const user = await User.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }
            else{
                return res.redirect('/users/sign-in');
            }
        }catch(error){
            console.log(error);
        }
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    });
}

// get the sign up data
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        console.log("The passwords do not match");
        return res.redirect('back');
    }
    try{
        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser){
            console.log("You are already an existing user. Sign in to continue");
            return res.redirect('/users/sign-in');
        }else{
            try{
                await User.create(req.body);
                console.log("Registered successfully. Sign in to continue");
                return res.redirect('/users/sign-in');
            }catch(error){
                console.log("Some error occurred. Please try again later");
                return res.redirect('back');
            }
        }
    }catch(error){
        console.log(error);
    }
}

// sign in and create a session for the user
module.exports.createSession = async function(req, res){

    // steps to authenticate
    // find the user
    try{
        const user = await User.findOne({email: req.body.email});
         // handle user found
         if (user){
            // handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
    }catch(err){
        console.log(err);
    }
}