const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },

    name: {
        type: String
    }
});

module.exports = ImageSchema;
