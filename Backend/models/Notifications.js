const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    isread: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Notifications", NotificationSchema);
