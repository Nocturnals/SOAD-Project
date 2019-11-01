const mongoose  = require('mongoose');

const OtherCompetitionSchema = mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Competitions',
    },
    name  :{
        type : String,
    },
})

module.exports = OtherCompetitionSchema;