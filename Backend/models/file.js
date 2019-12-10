const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },

    name: {
        type: String
    }
});

module.exports = mongoose.model("File", FileSchema);
