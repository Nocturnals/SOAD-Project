// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const otheruserschema = require("./Otheruser");
// const constants = require("./constants");

// const UserSchema = new Schema({
//     sender: {
//         type:[otheruserschema],
//         required: true
//     },
//     receiver: {
//         type: [otheruserschema],
//         required: true
//     },
//     timestamp: {
//         type: Date,
//         default: Date.now
//     },
// });

// const Conversation = new Schema({
//     _id : mongoose.Schema.Types.ObjectId,
//     sender_id :[otheruserschema],
//     receiver_id : [otheruserschema],
//     last_msg_id : mongoose.Schema.Types.ObjectId,
//     last_msg_date : Date
// });

// const MessageSchema = new Schema({
//     _id : mongoose.Schema.Types.ObjectId,
//     conversation_id : Number,
//     content:String,
//     enum : [...constants.type]
// })



// const Message = mongoose.model("Message", MessageSchema);
// const UsersofChat = mongoose.model("Users",UserSchema);
// const ConversationBetween = mongoose.model("ConversationBetween",Conversation);
// module.exports = Message;
// module.exports = UsersofChat;
// module.exports = ConversationBetween;

const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const MessageSchema = new Schema({  
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Message', MessageSchema); 