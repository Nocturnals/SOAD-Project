const express = require('express');
const {
    createPost,
    like,
    unlike,
    commentPost,
    deletePost,
    deleteAllComments,
    deleteComment,   
    likeComment,
    unlikeComment,
} = require('./postControls');

const{
    verifyToken,
    verifyUserWithToken,
} = require('../auth/helper');
const Post = require('../../models/Post');
const {
    createPostValidation,
    postLikeValidation,
} = require('./postValidation');


const router = express.Router();

var CircularJSON = require('circular-json');

router.get("/allposts", (req, res) => {
    var posts = Post.find()
    posts = CircularJSON.stringify(posts)
    posts = JSON.parse(posts)
    console.log(posts);
    return res.status(200).json({ posts });
});

// get posts
//router.get("/getposts", verifyToken, verifyUserWithToken, getRandomPosts);

// post routes
router.post("/createpost", verifyToken, verifyUserWithToken, createPost);

router.delete("/deletepost", verifyToken, verifyUserWithToken, deletePost);

router.patch("/deletecomment", verifyToken, verifyUserWithToken, deleteComment);


router.patch("/deleteallcomments", verifyToken, verifyUserWithToken, deleteAllComments);


// like unlike
router.put('/like', verifyToken, verifyUserWithToken, like);

router.put('/unlike', verifyToken, verifyUserWithToken, unlike);

// comments
router.post('/comment',  verifyToken, verifyUserWithToken, commentPost);

router.put('/comment/like',  verifyToken, verifyUserWithToken, likeComment);

router.put('/comment/unlike',  verifyToken, verifyUserWithToken, unlikeComment);
/*
*/
/*
router.post('/post/comment/reply',  verifyToken, verifyUserWithToken, replyComment);

*/

module.exports = router;
