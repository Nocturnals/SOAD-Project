const mongoose = require("mongoose");
const otheruserschema = require("./otheruser");
const commentsmodel = require("./Comments");

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    answer: {
        type: String
    }
});

const ResultSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    score: {
        type: Number
    },

    time: {
        type: Date
    }
});

const CompetitionsSchema = new mongoose.Schema({
    hosts: {
        type: [otheruserschema],
        required: true
    },

    starttime: {
        type: Date,
        required: true
    },

    endtime: {
        type: Date,
        required: true
    },

    noofparticipants: {
        type: Number,
        default: 0,
        required: true
    },

    participants: {
        type: [ResultSchema]
    },

    faqs: {
        type: [FaqSchema]
    },

    comments: {
        type: [commentsmodel]
    },

    top10: {
        type: [ResultSchema]
    }
});

module.exports = mongoose.model("Competitions", CompetitionsSchema);
