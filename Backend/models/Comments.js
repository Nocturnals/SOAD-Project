const mongoose  = require('mongoose');
const otheruserschema = required('./otheruser');



const ReplySchema = mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    likes:{
        type : Number,
        default:0,
    },
    likedby :{
        type :otheruserschema,
    }
})



const CommentSchema = mongoose.Schema({
    owner  :{
        type : otheruserschema,
    },

    message:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    likes:{
        type : Number,
        default:0,
    },
    likedby  :{
        type : otheruserschema,
    },
    replies : {
        type : [ReplySchema],
    },

});


 
commentmodel = mongoose.model("Comments" , CommentSchema);

module.exports = {commentmodel , CommentSchema};