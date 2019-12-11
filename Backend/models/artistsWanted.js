const mongoose = require("mongoose");

const artistTypes = require("./artistTypes");
const otherUserSchema = require("./Otheruser");

const workTypes = ["Full-time", "Part-time", "Temporary", "Intern"];

const artistWantedSchema = new mongoose.Schema({
    artistType: {
        enum: [...artistTypes],
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

    applied: {
        type: [otherUserSchema],
        default: []
    }
});

const artistWantedModel = mongoose.model("artistWanted", artistWantedSchema);

module.exports = artistWantedModel;
module.exports.workType = workTypes;
