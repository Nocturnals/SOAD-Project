const mongoose = require("mongoose");
const otheruserschema = require("./Otheruser");
const { PostSchema } = require("./Post");

const OrganizationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
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
module.exports = mongoose.model("organizations", OrganizationSchema);
module.exports.OrganizationSchema = OrganizationSchema;
