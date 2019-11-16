const express = require("express");
const Post = require("../../models/Post");

async function UpdatePost(req, res, next) {

    const post = await Post.findById(req.body.postId);
    if (!post) {
        return res.status(400).json({ message: "competition not found" });
    }
    req.post = post;
    var flag = false;
    
        if (JSON.stringify(post.owner[0]._id) == JSON.stringify(req.loggedUser._id)) {
            flag = true;
        }
   

    if (flag) {
        next();
    } else {
        return res.status(401).json({ message: "Access denied" });
    }
}

module.exports = { UpdatePost };