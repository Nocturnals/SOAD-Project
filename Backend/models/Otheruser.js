const mongoose = require("mongoose");

const OtherUserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    username: {
        type: String,
        required: true
    },

    profileurl: {
        type: String,
        required: true
    }
});

module.exports = OtherUserSchema;
module.exports.OtheruserModel = mongoose.model("Otheruser", OtherUserSchema);
