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
    getAllPosts,
    getSinglePost,
    getSpecialPost,
    getUserPosts
} = require('./postControls');

const {upload} = require("./imageUpload");
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
      fileSize: 50 * 1024 * 1024 // no larger than 50mb, you can change as needed.
    }
  });

  // multer({ storage : storage }).array('userPhoto',2);
  

const router = express.Router();

// get posts
router.get("/posts", verifyToken, verifyUserWithToken, getAllPosts);
router.get("/post/:postid", getSinglePost);
router.get("/userposts/:userId", getUserPosts);
router.get("/specialposts/:key",getSpecialPost);

//test
//router.post("/image", uploadFile);
router.post('/uploadimage', multer.single('file'), upload);
//router.post('/uploadmulti', uploadMultiple)

// post routes
router.post("/createpost", verifyToken, verifyUserWithToken, multer.single('file'), upload, createPost);

router.delete("/deletepost/:postid", verifyToken, verifyUserWithToken, deletePost);

router.patch("/deletecomment/:postid/:commentid", verifyToken, verifyUserWithToken, deleteComment);

router.patch("/editpost/:postid", verifyToken, verifyUserWithToken, editPost);


router.patch("/deleteallcomments/:postid", verifyToken, verifyUserWithToken, deleteAllComments);


// like unlike
router.put('/like/:postid', verifyToken, verifyUserWithToken, like);


// comments
router.post('/comment/:postid',  verifyToken, verifyUserWithToken, commentPost);

router.put('/comment/:postid/like/:commentid',  verifyToken, verifyUserWithToken, likeComment);

router.put('/comment/:postid/unlike/:commentid',  verifyToken, verifyUserWithToken, unlikeComment);
/*
*/
/*
router.post('/post/comment/reply',  verifyToken, verifyUserWithToken, replyComment);

*/

module.exports = router;
