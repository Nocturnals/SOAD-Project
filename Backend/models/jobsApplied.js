const mongoose = require("mongoose");

const artistTypes = require("./artistTypes");
const otherUserSchema = require("./Otheruser");

const JobsAvailableSchema = new mongoose.Schema({
    legalName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    artistType: {
        enum: [...artistTypes],
        type: String,
        required: true,
        lowercase: true
    },

    user: {
        type: otherUserSchema,
        required: true
    },

    availableLocation: {
        type: String,
        required: true
    },

    availableFrom: {
        type: String,
        required: true
    },

    availableTill: {
        type: String,
        required: true
    },

    portpolioSite: {
        type: String,
        default: ""
    },

    resumeLoc: {
        type: String,
        required: true
    },

    createdOn: {
        type: Date,
        default: Date.now
    }
});

const JobsAvailableModel = mongoose.model("JobsAvailable", JobsAvailableSchema);

module.exports = JobsAvailableModel;
module.exports.JobsAvailableSchema = JobsAvailableSchema;
