const mongoose = require("mongoose");
const services = require("./services");

const idKeySchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    service: {
        enum: [...services],
        type: String
    },

    key: {
        type: String,
        required: true
    }
});

const ServiceaccountModel = mongoose.model("Serviceaccount", idKeySchema);

module.exports = idKeySchema;
module.exports.ServiceaccountModel = ServiceaccountModel;
