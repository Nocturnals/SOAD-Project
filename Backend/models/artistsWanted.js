const mongoose = require("mongoose");

const artistTypes = require("./artistTypes");
const otherUserSchema = require("./Otheruser");

const workTypes = ["Full-time", "Part-time", "Temporary", "Intern"];

const otherJobSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobOffers",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    artistType: {
        enum: [...artistTypes],
        type: String,
        required: true
    },

    jobProvider: {
        type: otherUserSchema,
        required: true
    },

    salary: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["working", "done", "cancelled", "pending"]
    }
});

const jobOfferSchema = new mongoose.Schema({
    artistType: {
        enum: [...artistTypes],
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    jobProvider: {
        type: otherUserSchema,
        required: true
    },

    workAt: {
        type: String,
        required: true
    },

    workDuration: {
        type: String,
        required: true
    },

    workType: {
        enum: [...workTypes],
        type: String,
        required: true,
        default: "Full-time"
    },

    salary: {
        type: String,
        required: true
    },

    descriptionOfJob: {
        type: String,
        required: true
    },

    qualifications: {
        type: String,
        required: true
    },

    responsibilities: {
        type: String,
        required: true
    },

    applied: {
        type: [otherUserSchema],
        default: []
    }
});

const JobOffersModel = mongoose.model("jobOffers", jobOfferSchema);

module.exports = JobOffersModel;
module.exports.workType = workTypes;
module.exports.otherJobOfferSchema = otherJobSchema;
