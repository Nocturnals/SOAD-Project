const mongoose = require("mongoose");
const otheruserschema = require("./Otheruser");
const { commentsmodel, commentschema } = require("./Comments");
const { imageschema } = require("./Image");

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
        type: Date,
        default: Date.now()
    }
});

const CompetitionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    shortdescription: {
        type: String,
        required: true
    },

    fulldescription: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    prize: {
        type: String,
        required: true
    },

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
        type: [otheruserschema]
    },

    rules: {
        type: String,
        required: true
    },

    faqs: {
        type: [FaqSchema]
    },

    comments: {
        type: [commentsmodel]
    },

    top10: {
        type: [ResultSchema]
    },

    results: {
        type: [ResultSchema]
    },

    fileurls: {
        type: [imageschema]
    }
});

module.exports = mongoose.model("Competitions", CompetitionsSchema);
module.exports.faqModel = mongoose.model("FaqModel", FaqSchema);
module.exports.resultsModel = mongoose.model("ResultsModel", ResultSchema);
