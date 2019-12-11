const mongoose = require("mongoose");

const artistTypes = require("./artistTypes");
const otherUserSchema = require("./Otheruser");

const workTypes = ["FULL_TIME", "PART_TIME", "TEMPORARY", "INTERN"];

const otherJobOfferSchema = new mongoose.Schema({
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

const otherJobOfferModel = mongoose.model(
    "otherJobOffers",
    otherJobOfferSchema
);

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
    },

    createdOn: {
        type: Date,
        default: Date.now
    }
});

const JobOffersModel = mongoose.model("jobOffers", jobOfferSchema);

module.exports = { JobOffersModel, workTypes, otherJobOfferModel };
