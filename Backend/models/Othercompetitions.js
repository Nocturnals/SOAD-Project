const mongoose = require("mongoose");

const OtherCompetitionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competitions"
    },

    name: {
        type: String
    },

    starttime: {
        type: Date,
        required: true
    },

    endtime: {
        type: Date,
        required: true
    },

    shortdescription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "otherCompetitonsModel",
    OtherCompetitionSchema
);

module.exports.OtherCompetitionSchema = OtherCompetitionSchema;
