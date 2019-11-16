const mongoose = require("mongoose");

const OtherCompetitionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competitions"
    },

    name: {
        type: String
    }
});

module.exports = OtherCompetitionSchema;
