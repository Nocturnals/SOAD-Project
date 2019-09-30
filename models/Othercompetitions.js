const mongoose  = require('mongoose');

const OtherCompetitionSchema = mongoose.Schema({
    id : {
        type : String,
    },
    name  :{
        type : String,
    },
})

module.exports = OtherCompetitionSchema;