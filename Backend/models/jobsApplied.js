const mongoose = require("mongoose");

const artistTypes = require("./artistTypes");
const otherUserSchema = require("./Otheruser");

const JobsAppliedSchema = new mongoose.Schema({
    artistType: {
        enum: [...artistTypes],
        type: String,
        required: true
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
    }
});

const JobsAppliedModel = mongoose.model("JobsApplied", JobsAppliedSchema);

module.exports = JobsAppliedModel;
module.exports.JobsAppliedSchema = JobsAppliedSchema;
