const mongoose  = require('mongoose');

const OtherUserSchema = mongoose.Schema({
    id : {
        type:String,
        required:true,
    },
    username : {
        type:String,
        required:true,
    },
    profileurl : {
        type:String,
        required:true,
    }


});


module.exports = OtherUserSchema;