const mongoose = require("mongoose");

const fileLocSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }
});

const FileLocModel = mongoose.model("FileLocations", fileLocSchema);

module.exports = FileLocModel;
module.exports.fileLocSchema = fileLocSchema;
