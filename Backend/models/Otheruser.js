const mongoose  = require('mongoose');

const OtherUserSchema = new mongoose.Schema({
    id : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
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