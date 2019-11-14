const Post = require('../../models/post');
const OtherUser = require('../../models/Otheruser');
const User = require('../../models/user');
const Comment = require('../../models/Comments')
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const auth = require('../auth/index');






exports.createPost = async (req, res, next) => {
    
    const user = req.loggedUser;

    


    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        content:req.body.content,
        owner: [
            {
                _id: user._id,
                username: user.name,
                profileurl: user.profileurl || "random string"
            }
        ],
    });


    await post.save()
    .then(result => {
        res.status(200).json({
            docs:[posts]
        });
    })
    .catch(err => {
        console.log(err);
    });
};





/*

router.post("/delete", (req, res, next) => {
    const rid = req.body.id;

    Post.findById(rid)
        .exec()
        .then(docs => {
            docs.remove();
            res.status(200).json({
                deleted:true
            });
        })
        .catch(err => {
            console.log(err)
        });
});
*/



exports.like = (req, res) => {

    


    const post = await Post.findById({_id: req.body.postId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );

    post.likedBy.append({
        id: req.loggedUser._id,
        username: req.loggedUser.username,
        profileurl: req.loggedUser.profileurl
    });

    post.likes = post.likes + 1;
};


exports.unlike = (req, res) => {
    
    const post = await Post.findById({_id: req.body.postId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );
    
    const userid = req.loggedUser._id;

    var removeIndex = apps.map(function(item) { return item.id; }).indexOf(userid);

    post.likedBy.splice(removeIndex,1);
    post.likes = post.likes - 1;
};

exports.comment = (req, res) => {
    let comment = req.body.comment;
    const user = req.loggedUser;

    const comment = new Comment({
        message: req.body.comment,
        owner: [
            {
                _id: user._id,
                username: user.name,
                profileurl: user.profileurl || "random string"
            }
        ],
    });

    await comment.save()
    .then(result => {
        res.status(200).json({
            docs:[comments]
        });
    })
    .catch(err => {
        console.log(err);
    });

    const post = await Post.findById({_id: req.body.postId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );

    post.comments.append({
        comment
    });


};

exports.comment = (req, res) => {
    let comment = req.body.comment;
    const user = req.loggedUser;

    const comment = new Comment({
        message: req.body.comment,
        owner: [
            {
                _id: user._id,
                username: user.name,
                profileurl: user.profileurl || "random string"
            }
        ],
    });

    await comment.save()
    .then(result => {
        res.status(200).json({
            docs:[comments]
        });
    })
    .catch(err => {
        console.log(err);
    });

    const post = await Post.findById({_id: req.body.postId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );

    post.comments.append({
        comment
    });


};


exports.likeComment = (req, res) => {
    const user = req.loggedUser;
    const commentId = req.body.commentId;
    const postId = req.body.postId;

    const comment = await Comment.findById({_id: commentId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );

    comment.likedBy.append({
        id: req.loggedUser._id,
        username: req.loggedUser.username,
        profileurl: req.loggedUser.profileurl
    });

    comment.likes = comment.likes + 1;

    const post = await Post.findById({_id: postId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );

    var updateIndex = apps.map(function(item) { return item.id; }).indexOf(commentId);

    post.comments[updateIndex] = comment; 


};

exports.unlikeComment = (req, res) => {
    const user = req.loggedUser;
    const commentId = req.body.commentId;
    const postId = req.body.postId;

    const comment = await Comment.findById({_id: commentId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );

    var removeIndex = apps.map(function(item) { return item.id; }).indexOf(userid);

    comment.likedBy.splice(removeIndex,1);
    comment.likes = comment.likes - 1;

    const post = await Post.findById({_id: postId}).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );

    var updateIndex = apps.map(function(item) { return item.id; }).indexOf(commentId);

    post.comments[updateIndex] = comment; 


};

