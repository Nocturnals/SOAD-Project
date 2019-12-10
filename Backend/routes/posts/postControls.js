const Post = require('../../models/Post');
const {
    createPostValidation,
    createCommentValidation,
    deletePostValidation,
    editPostValidation,
} = require('./postValidation');
const _ = require("lodash"); // for modifing the array contents

const { ReplyModel, CommentsModel } = require("../../models/Comments");
const artist = require("../../models/artistTypes");
const { OtheruserModel } = require("../../models/Otheruser");
const Image = require("../../models/Image");
const {upload} = require("./imageUpload");
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
    
    
    

    var exist = artist.map(function(item) { return item; }).indexOf(req.body.Category);
    if (exist == -1)
        return res
            .status(500)
            .json({ message: "Category Invalid !!" });
    /**/
    
    const user = req.loggedUser;
    
    
    
        const post = new Post(
            {
                title: req.body.title,
                content:req.body.content,
                description:req.body.description,
                isprivate:req.body.isPrivate,
                category:req.body.Category,
                owner: [
                    {
                        _id: user._id,
                        username: user.name,
                        profileurl: user.profileurl || "random string"
                    }
                ],
            }
        );
        if(req.body.Category != "Story Writer")
        {
            const images = req.imageurls;    
            const len = images.length;
            for(var i=0;i<len;i++)
                {
                    const image = new Image(
                        {
                            url : images[i].url,
                            name : images[i].name
                        }
                    );
                    const simage = await image.save();
                    post.imageurls[i] = simage;
                    
                }
        }



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
    
    console.log(req.body)

    try{
        const post = await Post.findById(
            {
                _id: req.params.postid
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
    const user = req.loggedUser;
    console.log(req.body)

    try {
        const post = await Post.findById(
            {
                _id: req.params.postid
            }
        )
        
        const userid = req.loggedUser._id;


    
        var removeIndex = post.likedBy.map(function(item) { return item._id; }).indexOf(userid);

        if (removeIndex != -1)
        {
            post.likedBy.splice(removeIndex,1);
            post.likes = post.likes - 1;
            
            
                const savedpost = await post.save();
                
            
            
            return res.json(savedpost);
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
        const otheruser = new OtheruserModel({
            _id: req.loggedUser._id,
            username: req.loggedUser.name,
            profileurl: req.loggedUser.profileurl
        });

        const comment = new CommentsModel(
            {
                owner: otheruser,
                message: req.body.comment,
            }
        );
        
        

    try {
        const post =  await Post.findById(
            {
                _id: req.params.postid
            }
        )

        const uid = req.loggedUser._id;

        

        
            post.comments.push(comment);
        
            
                const savedpost = await post.save();
            
            return res.json(savedpost);
        

        
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    }

};



exports.deleteComment = async (req, res, next) => {

    try {
        const post =  await Post.findById(
            {
                _id: req.params.postid
            }
        )
        const commentId = req.params.commentid;

        const uid = req.loggedUser._id;
        var removeIndex = post.comments.map(function(item) { return item._id; }).indexOf(commentId);
        const owner = post.comments[removeIndex].owner._id;
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
    try {
        const post =  await Post.findById(
            {
                _id: req.params.postid
            }
        );
        const uid = req.loggedUser._id;
        const owner = post.owner[0]._id;
//        console.log(uid);
//        console.log(owner);

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
        try {
            
            const post =  await Post.findById(
                {
                    _id: req.params.postid
                }
            );
//            console.log(post.comments);
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
                    _id: req.params.postid
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
                post.isprivate = req.body.isPrivate;
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



exports.likeComment = async (req, res, next) => {
    try {
        const userid = req.loggedUser._id;
        const commentId = req.params.commentid;
        const postId = req.params.postid;
        var flag = false;
        
        
        const post =  await Post.findById(
            {
                _id: postId
            }
        );

        var updateIndex = post.comments.map(function(item) { return item._id; }).indexOf(commentId);
        const test = post.comments[updateIndex];
//        console.log(userid);
//        console.log(test.likedby[0]);

        var removeIndex = test.likedby.map(function(item) { return item._id; }).indexOf(userid);
//        console.log("Remove Index comes here ::::::");
//        console.log(removeIndex);

        


        if(removeIndex == -1)
        {
            const user = req.loggedUser;
            let likeduser = {
                _id: user._id,
                username: user.name,
                profileurl: user.profileurl
            };
//            console.log(post.comments[updateIndex]);
    
            const com =  post.comments[updateIndex];
    
            
    
            com.likes = com.likes + 1;
//            console.log(com.likedby);
            com.likedby.push(likeduser);
//            console.log(com.likedby);
            
            var comment = new CommentsModel(
                {
                    _id:com._id,
                    likes:com.likes,
                    likedby:com.likedby,
                    owner:com.owner,
                    message:com.message,
                    replies:com.replies,
                    date:com.date,                
                }
            );
//            console.log("New Comment comes here ::::");
//            console.log(comment);
            post.comments.splice(updateIndex,1);
            post.comments.push(comment);
            
           
    
            
                const savedpost = await post.save();
    //            console.log(savedpost);
                
            return res.json(savedpost);
        }
        else
        {
            return res.status(500).json({ message: "You've already liked !!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    } 


};


exports.unlikeComment = async (req, res, next) => {
    try {
        const userid = req.loggedUser._id;
        const commentId = req.params.commentid;
        const postId = req.params.postid;


        const post = await Post.findById(
            {
                _id: postId
            }
        );
        var updateIndex = post.comments.map(function(item) { return item._id; }).indexOf(commentId);

        const com = post.comments[updateIndex];


        var removeIndex = com.likedby.map(function(item) { return item._id; }).indexOf(userid);


        com.likedby.splice(removeIndex,1);

        com.likes = com.likes - 1;

        var comment = new CommentsModel(
            {
                _id:com._id,
                likes:com.likes,
                likedby:com.likedby,
                owner:com.owner,
                message:com.message,
                replies:com.replies,
                date:com.date,                
            }
        );

        


//        console.log(comment);
        post.comments.splice(updateIndex,1);
        post.comments.push(comment);

       
            const savedpost = await post.save();
//            console.log(savedpost);
        

        return res.json(savedpost);
    } catch (error) {
        return res.status(500).json({ message: "Post not found !!" });
    } 

};
/*
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

