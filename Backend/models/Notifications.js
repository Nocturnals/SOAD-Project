const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
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

const NotificationsModel = mongoose.model("Notifications", NotificationSchema);

module.exports = NotificationsModel;
module.exports.NotificationSchema = NotificationSchema;
