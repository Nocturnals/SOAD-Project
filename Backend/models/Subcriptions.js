const mongoose = require("mongoose");
const otheruserschema = require("./Otheruser");
const postschema = require("./Post");

const planpostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    posts: {
        type: [planpostSchema]
    },
    contentCreators: {
        type: [otheruserschema],
        required: true
    },
    subscribers: {
        type: [otheruserschema]
    },
    threshold: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Plans", planSchema);

module.exports.planpostModel = mongoose.model("planpost", planpostSchema);
