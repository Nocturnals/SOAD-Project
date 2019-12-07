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
    editPost,
} = require('./postControls');

const {upload} = require('./imageUpload');
//const {uploadFile} = require('./image');
const{
    verifyToken,
    verifyUserWithToken,
} = require('../auth/helper');
const Post = require('../../models/Post');
const {
    createPostValidation,
    postLikeValidation,
} = require('./postValidation');

const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
  });
  

const router = express.Router();

// get posts
//router.get("/getposts", verifyToken, verifyUserWithToken, getRandomPosts);

//test
//router.post("/image", uploadFile);
router.post('/uploadimage', multer.single('file'), upload);


// post routes
router.post("/createpost", verifyToken, verifyUserWithToken, createPost);

router.delete("/deletepost", verifyToken, verifyUserWithToken, deletePost);

router.patch("/deletecomment", verifyToken, verifyUserWithToken, deleteComment);

router.patch("/editpost", verifyToken, verifyUserWithToken, editPost);


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
