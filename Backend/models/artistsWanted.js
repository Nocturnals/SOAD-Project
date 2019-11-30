const mongoose = require("mongoose");

const artistTypes = require("./artistTypes");
const otherUserSchema = require("./Otheruser");

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
