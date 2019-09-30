const mongoose  = require('mongoose');
const otheruserschema = require('./otheruser');
const othercompetititonschema = require('./Othercompetitions');


const UserSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
    },

    dateofbirth : {
        type : Date,
    },

    primaryinterest :{
        enum : ["cat1","cat2"],
    },

    otherinterest : {
        enum : ["cat1","cat2"],
    },

    lastactive : {
        type : Date,
    },

    profileurl :{
        type : String,
    },

    coverphotourl : {
        type :String,
    },

    profilephotourl : {
        type :String,
    },

    competitionsparticipated : {
        type : [othercompetititonschema],
    },

    competitionsparticipating : {
        type : [othercompetititonschema],
    },

    followers : {
        type : [otheruserschema],
    },

    following  : {
        type : [otheruserschema],
    },

})



module.exports = mongoose.model("Users" , UserSchema);