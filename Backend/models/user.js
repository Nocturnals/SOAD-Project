const mongoose = require("mongoose");

const { JobsAppliedSchema } = require("./jobsApplied");
const otheruserschema = require("./Otheruser");
const othercompetititonschema = require("./Othercompetitions");
const { NotificationSchema } = require("./Notifications");
const { OrganizationSchema } = require("./Organizations");
const artistTypes = require("./artistTypes");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
        trim: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    dateofbirth: {
        type: Date
    },

    primaryinterest: {
        enum: artistTypes,
        type: String,
        default: null
    },

    otherinterest: {
        type: String
    },

    lastactive: {
        type: Date
    },

    profileurl: {
        type: String,
        default: "defalutPic"
    },

    coverphotourl: {
        type: String
    },

    profilephotourl: {
        type: String
    },

    competitionsparticipated: {
        type: [othercompetititonschema]
    },

    competitionsparticipating: {
        type: [othercompetititonschema]
    },

    followers: {
        type: [otheruserschema]
    },

    following: {
        type: [otheruserschema]
    },

    emailVerified: {
        type: Boolean,
        default: false
    },

    jobsApplied: {
        type: [JobsAppliedSchema],
        default: []
    },
    notifications: {
        type: [NotificationSchema],
        default: []
    },
    organizations: {
        type: [OrganizationSchema],
        default: []
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
