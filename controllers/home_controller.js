const Post = require('../models/post');

module.exports.home = function(req, res){
    console.log(req.cookies);
    // Post.find({}).then((posts) => {
    //     return res.render('home', {
    //         title: "Codial | Home",
    //         posts: posts 
    //     });
    // });

    Post.find({}).populate('user').then((posts) => {
        return res.render('home', {
            title: "Codial | Home",
            posts: posts 
        });
    });
}
//module.exports.actionName = function(req, res){}