const express = require('express');
const {
    createPost,
    like,
    unlike,
    comment,
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
router.put('/post/comment',  verifyToken, verifyUserWithToken, comment);



module.exports = router;
