const mongoose = require("mongoose");
const otheruserschema = require("./Otheruser");
const { CommentsSchema } = require("./Comments");
const imageschema = require("./Image");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    likedBy:{
        type: [otheruserschema],
    },

    likes: {
        type: Number,
        default: 0
    },

    owner: {
        type: [otheruserschema],
        required: true
    },

    category: {
        enum: ["cat1", "cat2"],
        type: String
    },

    sharedby: {
        type: [otheruserschema]
    },

    sharedcount: {
        type: Number
    },

    comments: {
        type: [CommentsSchema]
    },

    imageurls: {
        type: [imageschema]
    }
});

module.exports = mongoose.model("Posts", PostSchema);
