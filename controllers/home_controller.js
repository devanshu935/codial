const Post = require('../models/post');

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
    .then(posts => {
        res.render('home', {
          title: "Codial | Home",
          posts: posts 
        });
      })
    .catch(err => {
    // Handle any errors here
    console.error(err);
    });
}

//module.exports.actionName = function(req, res){}