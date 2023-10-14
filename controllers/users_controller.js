const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id).then((user) => {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.update = function(req, res) {
    if(req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body).then(() => {
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout((err) => console.log(err));
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}