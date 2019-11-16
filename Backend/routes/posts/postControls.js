const Post = require('../../models/Post');
const {
    createPostValidation,
    postLikeValidation,
    postUnlikeValidation,
    createCommentValidation,
    postCommentLikeValidation,
    postCommentUnlikeValidation,
    deletePostValidation,
    deleteAllCommentsValidation,
    editPostValidation,
    deleteCommentValidation,
} = require('./postValidation');

const { ReplyModel, CommentsModel } = require("../../models/Comments");/*
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
        
        const userid = req.loggedUser._id;

        var exist = post.likedBy.map(function(item) { return item._id; }).indexOf(userid);

        if (exist == -1)
        {
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
                return res.json(savedpost);
            } catch (err) {
                return res.status(500).json({ message: err });
            }
        }
        else
        {
            return res.status(500).json({ message: "You've already liked !!" });
        }



        

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

        if (removeIndex != -1)
        {
            post.likedBy.splice(removeIndex,1);
            post.likes = post.likes - 1;
            
            try {
                const savedpost = await post.save();
                res.json(savedpost);
            } catch (err) {
                res.status(500).json({ message: err });
            }
            
            return res.json({ message: "Unliked successfully" });
        }
        else 
        {
            return res.json({ message: "You've not liked yet !" });
        }
    
        
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
    
    console.log(req.body)

        const comment = new CommentsModel(
            {
                message: req.body.comment,
                owner: [
                    {
                        _id: req.loggedUser._id,
                        username: req.loggedUser.name,
                        profileurl: req.loggedUser.profileurl || "random string"
                    }
                ],
            }
        );
        
        console.log(comment);
        

    try {
        const post =  await Post.findById(
            {
                _id: req.body.postId
            }
        )

        const uid = req.loggedUser._id;

        

        
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



exports.deleteComment = async (req, res, next) => {
    const validatedData = deleteCommentValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    console.log(req.body)

        
        
        
        

    try {
        const post =  await Post.findById(
            {
                _id: req.body.postId
            }
        )
        const commentId = req.body.commentId;

        const uid = req.loggedUser._id;
        var removeIndex = post.comments.map(function(item) { return item._id; }).indexOf(commentId);
        const owner = post.comments[removeIndex].owner[0]._id;
        const postowner = post.owner[0]._id;

        var flag = false;
            if((JSON.stringify(owner) == JSON.stringify(uid)) || (JSON.stringify(postowner) == JSON.stringify(uid)))
            {
                flag = true;
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot delete the comments" });
            }

console.log(flag);
        

        
            if (flag) {
                post.comments.splice(removeIndex,1);
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot delete the comment" });
            }
            await post.save();
            return res.json(post);
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    }

};


exports.deletePost = async (req, res, next) => {
    const validatedData = deletePostValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    console.log(req.body)

    

    try {
        const post =  await Post.findById(
            {
                _id: req.body.postId
            }
        );
        const uid = req.loggedUser._id;
        const owner = post.owner[0]._id;
        console.log(uid);
        console.log(owner);

        if(uid.equals(owner) == true)
        {
            await post.remove();
            return res.json(post);
            
        }
        else {
            return res.json({ message: "Access Denied" });
        }

            
            
        

        
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    }

};




exports.deleteAllComments = async (req, res, next) => {
    const validatedData = deleteAllCommentsValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    console.log(req.body)
        try {
            
            const post =  await Post.findById(
                {
                    _id: req.body.postId
                }
            );
            console.log(post.comments);
            const uid = req.loggedUser._id;
            const owner = post.owner[0]._id;

            var flag = false;
            if(JSON.stringify(owner) == JSON.stringify(uid))
            {
                flag = true;
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot delete the comments" });
            }
            

            if (flag) {
                post.comments.splice(0,post.comments.length);
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot delete the comment" });
            }
            await post.save();
            return res.json(post);
        } catch (error) {
            console.log(error);
            return res.json({ message: " Failed  to update Post" });
        }
};


exports.editPost = async (req, res, next) => {
    const validatedData = editPostValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    
    console.log(req.body)
        try {
            
            const post =  await Post.findById(
                {
                    _id: req.body.postId
                }
            );
            const uid = req.loggedUser._id;
            const owner = post.owner[0]._id;

            var flag = false;
            if(JSON.stringify(owner) == JSON.stringify(uid))
            {
                flag = true;
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot edit the post" });
            }


            

            if (flag) {
                post.title = req.body.title;
                post.content = req.body.content;
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot edit the post" });
            }
            await post.save();
            return res.json(post);
        } catch (error) {
            console.log(error);
            return res.json({ message: " Failed  to update Post" });
        }
};


/*
exports.likeComment = async (req, res, next) => {
    const validatedData = postCommentLikeValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });


    console.log(req.body);
    try {
        const user = req.loggedUser;
        const commentId = req.body.commentId;
        const postId = req.body.postId;
        
        
        const post =  await Post.findById(
            {
                _id: postId
            }
        );

        var updateIndex = post.comments.map(function(item) { return item._id; }).indexOf(commentId);

        let likeduser = {
            _id: user._id,
            username: user.name,
            profileurl: user.profileurl
        };

        post.comments[updateIndex].likes = post.comments[updateIndex].likes + 1;

        
        var comment = Comment(
            {
                _id:post.comments[updateIndex]._id,
                likes:post.comments[updateIndex].likes,
                likedby:post.comments[updateIndex].likedby.push(likeduser),
                owner:post.comments[updateIndex].owner,
                message:post.comments[updateIndex].message,
                replies:post.comments[updateIndex].replies,
                date:post.comments[updateIndex].date,                
            }
        );
        
       

        try {
            const savedpost = await post.save();
            console.log(savedpost);
            res.json(savedpost);
                     
        } catch (err) {
            res.status(500).json({ message: err });
        }

        return res.json({ message: "Comment liked successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    } 


};


exports.unlikeComment = async (req, res, next) => {
    const validatedData = postCommentUnlikeValidation(req.body);
    
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });


    console.log(req.body);
    try {
        const userid = req.loggedUser._id;
        const commentId = req.body.commentId;
        const postId = req.body.postId;


        const post = await Post.findById(
            {
                _id: postId
            }
        );
        console.log("______________________________________________________");

        console.log(post.comments);
        console.log("______________________________________________________");

        var updateIndex = post.comments.map(function(item) { return item._id; }).indexOf(commentId);
        console.log(updateIndex);

        const comment = post.comments[updateIndex];
        console.log("______________________________________________________");
        console.log(comment);
        console.log("______________________________________________________");
        
        console.log(comment.likes);
        console.log(comment.likedby);

        

        var removeIndex = comment.likedby.map(function(item) { return item._id; }).indexOf(userid);

        comment.likedby.splice(removeIndex,1);
        console.log("______________________________________________________");

        console.log(comment.likes);
        comment.likes = comment.likes - 1;
        console.log("-----");
        console.log(comment.likes);
        console.log("______________________________________________________");

        post.comments[updateIndex] = comment;

        try {
            const savedpost = await post.save();
            console.log(savedpost);
        } catch (err) {
            res.status(500).json({ message: err });
        }

        return res.json({ message: "Comment unliked successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    } 

};
*/
/*
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

