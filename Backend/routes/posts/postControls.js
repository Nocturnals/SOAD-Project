const Post = require('../../models/Post');
const {
    createPostValidation,
    postLikeValidation,
    postUnlikeValidation,
    createCommentValidation,
    postCommentLikeValidation,
    postCommentUnlikeValidation,
} = require('./postValidation');

const {commentsmodel, commentschema} = require("../../models/Comments");
/*
const OtherUser = require('../../models/Otheruser');
const User = require('../../models/user');
const Comment = require('../../models/Comments')
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const auth = require('../auth/index');
*/






exports.createPost = async (req, res, next) => {
    
    const validatedData = createPostValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    const user = req.loggedUser;
    console.log(user)
    console.log(req.body)
        
    
        const post = new Post(
            {
                title: req.body.title,
                content:req.body.content,
                owner: [
                    {
                        _id: user._id,
                        username: user.name,
                        profileurl: user.profileurl || "random string"
                    }
                ],
            }
        );

        try {
            const savedpost = await post.save();
            res.json(savedpost);
        } catch (err) {
            res.status(500).json({ message: err });
        }

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



exports.like = async (req, res) => {

    const validatedData = postLikeValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    
    console.log(req.body)

    try{
        const post = await Post.findById(
            {
                _id: req.body.postId
            }
        )
        const user = req.loggedUser;




        let likeduser = {
            _id: user._id,
            username: user.name,
            profileurl: user.profileurl
        };


        post.likedBy.push(likeduser);
        

        post.likes = post.likes + 1;

        try {
            const savedpost = await post.save();
            res.json(savedpost);
        } catch (err) {
            res.status(500).json({ message: err });
        }

        return res.json({ message: "liked successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    }

   
};


exports.unlike = async (req, res, next) => {
    const validatedData = postUnlikeValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    const user = req.loggedUser;
    console.log(user)
    console.log(req.body)

    try {
        const post = await Post.findById(
            {
                _id: req.body.postId
            }
        )
        
        const userid = req.loggedUser._id;
    
        var removeIndex = post.likedBy.map(function(item) { return item._id; }).indexOf(userid);
    
        post.likedBy.splice(removeIndex,1);
        post.likes = post.likes - 1;
        
        try {
            const savedpost = await post.save();
            res.json(savedpost);
        } catch (err) {
            res.status(500).json({ message: err });
        }
        
        return res.json({ message: "Unliked successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    }
    


    
    
};


exports.commentPost = async (req, res, next) => {
    const validatedData = createCommentValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    const user = req.loggedUser;
    console.log(req.body)

    
        console.log(user);

        const comment = new commentschema(
            {
                message: req.body.comment,
                owner: [
                    {
                        _id: user._id,
                        username: user.name,
                        profileurl: user.profileurl || "random string"
                    }
                ],
            }
        );

        console.log(comment);
    
        try {
            const savedcomment = await comment.save();
            res.json(savedcomment);
        } catch (err) {
            res.status(500).json({ message: err });
        }

    try {
        const post =  await Post.findById(
            {
                _id: req.body.postId
            }
        )

        console.log(post._id);



        
    
        
    
        post.comments.push(comment);
        
        try {
            const savedpost = await post.save();
            res.json(savedpost);
        } catch (err) {
            res.status(500).json({ message: err });
        }

        return res.json({ message: "Commented successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    }

};


exports.likeComment = async (req, res, next) => {
    const validatedData = postCommentLikeValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });


    
    try {
        const user = req.loggedUser;
        const commentId = req.body.commentId;
        const postId = req.body.postId;

        const comment =  Comment.findById(
            {
                _id: commentId
            }
        )

        comment.likedBy.append({
            id: req.loggedUser._id,
            username: req.loggedUser.username,
            profileurl: req.loggedUser.profileurl
        });

        comment.likes = comment.likes + 1;

        try {
            const savedcomment = await comment.save();
            res.json(savedcomment);
        } catch (err) {
            res.status(500).json({ message: err });
        }
        

        const post =  Post.findById({_id: postId}).exec(
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
        
        try {
            const savedpost = await post.save();
            res.json(savedpost);
        } catch (err) {
            res.status(500).json({ message: err });
        }

        return res.json({ message: "Comment liked successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    } 


};

/*
exports.unlikeComment = (req, res) => {
    const user = req.loggedUser;
    const commentId = req.body.commentId;
    const postId = req.body.postId;

    const comment =  Comment.findById({_id: commentId}).exec(
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

    const post =  Post.findById({_id: postId}).exec(
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


exports.replyComment = (req, res) => {
    let reply = req.body.reply;
    const user = req.loggedUser;
    const commentId = req.body.commentId;
    const postId = req.body.postId;



    const comment =  Comment.findById({_id: commentId}).exec(
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

    comment.replies.append(
        [
            {
                _id: mongoose.Types.ObjectId(),
                owner: [
                    {
                        _id: user._id,
                        username: user.name,
                        profileurl: user.profileurl || "random string"
                    }
                ],
                date: Date.now,
                likes: 0,
                likedBy: [{}]

            }
        ]
    );

    const post =  Post.findById({_id: req.body.postId}).exec(
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



exports.replyCommentLike = (req, res) => {
    let replyId = req.body.replyId;
    const user = req.loggedUser;
    const commentId = req.body.commentId;
    const postId = req.body.postId;



    const comment =  Comment.findById({_id: commentId}).exec(
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
    var updateReplyIndex = apps.map(function(item) { return item.id; }).indexOf(replyId);


    comment.replies[updateReplyIndex].likedBy.append(
        {
            id: req.loggedUser._id,
            username: req.loggedUser.username,
            profileurl: req.loggedUser.profileurl
        }
    );

    comment.replies[updateReplyIndex].likes = comment.replies[updateReplyIndex].likes + 1; 


    const post =  Post.findById({_id: req.body.postId}).exec(
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
*/

