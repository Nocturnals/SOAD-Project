const mongoose = require("mongoose");
const otheruserschema = require("./Otheruser");
const { PostSchema } = require("./Post");

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: null
    },
    adminUsers: {
        type: [otheruserschema],
        require: true
    },
    Users: {
        type: [otheruserschema],
        default: []
    },
    PendingUsers: {
        type: [otheruserschema],
        default: []
    },
    Posts: {
        type: [PostSchema],
        default: []
    }
});

module.exports = OrganizationSchema;
module.exports.OrganizationModel = mongoose.model(
    "organizations",
    OrganizationSchema
);
