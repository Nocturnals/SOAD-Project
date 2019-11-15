const express = require('express');
const {
    createPost,
    like,
    unlike,
    commentPost,
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



// post routes
router.post("/createpost", verifyToken, verifyUserWithToken, createPost);

// like unlike
router.put('/like', like);

router.put('/unlike', verifyToken, verifyUserWithToken, unlike);

// comments
router.post('/comment',  verifyToken, verifyUserWithToken, commentPost);
/*
router.put('/post/comment/like',  verifyToken, verifyUserWithToken, likeComment);
router.put('/post/comment/unlike',  verifyToken, verifyUserWithToken, unlikeComment);
router.post('/post/comment/reply',  verifyToken, verifyUserWithToken, replyComment);

*/

module.exports = router;
