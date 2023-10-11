const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // Post.find({}).then((posts) => {
    //     return res.render('home', {
    //         title: "Codial | Home",
    //         posts: posts 
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        } 
    })
    .then((posts) => {
      User.find({}).then((users) => {
        res.render('home', {
          title: "Codial | Home",
          posts: posts,
          all_users: users 
        });
    });
  }).catch(err => {
    // Handle any errors here
    console.error(err);
    });
}

//module.exports.actionName = function(req, res){}