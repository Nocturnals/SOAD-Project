const mongoose  = require('mongoose');
const otheruserschema = require('./otheruser');
const othercompetititonschema = require('./Othercompetitions');
const commentsmodel = require('./Comments');


const FaqSchema  =mongoose.Schema({
    question : {
        type : String,
    },

    answer :{
        type : String,
    },
});

const ResultSchema = mongoose.Schema({
    id : {
        type : String,
    },

    name : {
        type : String,
    },

    score : {
        type : Number,
    },

    time : {
        type :Date,
    },
})


const CompetitionsSchema = mongoose.Schema({
    hosts : {
        type : [otheruserschema],
    },
    
    starttime : {
        type :Date,
    },

    endtime : {
        type :Date,
    },

    noofparticipants :{
        type : Number,
    },

    participants : {
        type : [ResultSchema],
    },

    faqs :{
        type:[FaqSchema],
    },

    comments : {
        type : [commentsmodel],
    },

    top10 : {
        type : [ResultSchema], 
    },

});


module.exports = mongoose.model("Competitions" , CompetitionsSchema);