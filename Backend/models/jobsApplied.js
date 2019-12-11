const mongoose = require("mongoose");

const artistTypes = require("./artistTypes");
const otherUserSchema = require("./Otheruser");

const JobsAvailableSchema = new mongoose.Schema({
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

    availableAt: {
        type: String,
        required: true
    },

    freeTimeFrom: {
        type: Number,
        default: 0,
        required: true
    },

    freeTimeTill: {
        type: Number,
        default: 0,
        required: true
    },

    portpolioSite: {
        type: String,
        default: ""
    },

    cvLocation: {
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
