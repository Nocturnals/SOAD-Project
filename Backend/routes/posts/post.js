const express = require('express');
const {
    createPost,
    like,
    unlike,
    comment,
    likeComment,
    unlikeComment,
} = require('./postControls');

const{
    verifyToken,
    verifyUserWithToken,
} = require('../auth/helper');
const { createPostValidator } = require('./postValidation');

const router = express.Router();

// post routes
router.post('/posts/new', verifyToken, verifyUserWithToken,  createPost, createPostValidator);

// like unlike
router.put('/post/like', verifyToken, verifyUserWithToken, like);
router.put('/post/unlike', verifyToken, verifyUserWithToken, unlike);

// comments
router.post('/post/comment',  verifyToken, verifyUserWithToken, comment);
router.put('/post/comment/like',  verifyToken, verifyUserWithToken, likeComment);
router.put('/post/comment/unlike',  verifyToken, verifyUserWithToken, unlikeComment);




module.exports = router;
