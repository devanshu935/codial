const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.findById(req.body.post).then((post) => {
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }).then((comment) => {
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id).then((comment) => {
        if(comment.user == req.user.id){
            let postId = comment.post;
            Comment.deleteOne({_id: comment.id}).then(() => {
                Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}).then(() => {
                    return res.redirect('back');
                });
            });
        }
    }).catch((err) => {
        console.log(err);
    });
}