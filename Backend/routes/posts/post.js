const express = require('express');
const {
    createPost,
    like,
    unlike,
} = require('./postControls');
const auth = require('../auth/index');

const { requireSignin } = require('./authControls');
const { createPostValidator } = require('./postValidation');

const router = express.Router();

// post routes
router.post('/posts/new', verifyToken, verifyUserWithToken,  createPost, createPostValidator);

// like unlike
router.put('/post/like', verifyToken, verifyUserWithToken, like);
router.put('/post/unlike', verifyToken, verifyUserWithToken, unlike);



module.exports = router;
