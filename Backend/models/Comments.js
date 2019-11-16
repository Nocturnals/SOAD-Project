const mongoose = require("mongoose");
const otheruserschema = require("./Otheruser");

const ReplySchema = new mongoose.Schema({
    owner: {
        type: otheruserschema,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    likes: {
        type: Number,
        default: 0
    },

    likedby: {
        type: [otheruserschema]
    }
});

const CommentSchema = new mongoose.Schema({
    owner: {
        type: [otheruserschema],
        required: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    likes: {
        type: Number,
        default: 0
    },

    likedby: {
        type: [otheruserschema]
    },

    replies: {
        type: [ReplySchema]
    }
});

commentmodel = mongoose.model("Comments", CommentSchema);

module.exports = { commentmodel, CommentSchema };
module.exports.CommentsModel = mongoose.model("CommentsModel", CommentSchema);
module.exports.ReplyModel = mongoose.model("ReplyModel", ReplySchema);