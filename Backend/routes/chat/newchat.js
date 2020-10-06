const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const Message = require('../../models/message');
const UsersofChat = require('../../models/message');
const ConversationBetween = require('../../models/message');
const { OtheruserModel } = require("../../models/Otheruser");
const UserModel = require("./../../models/user");

const socket = require('socket.io');
const chatServer = require('../../server');
const bodyParser = require('body-parser')

const router = express.Router();

router.use(bodyParser.json());

const {Conversation,
        ChatCreate,
        Userdata} = require('./chatvalidation');


router.get("/messages",async(req,res) => {

    try{
        const otherusr = await OtheruserModel.findby
        console.log(otherusr);
        //return res.status(200).json(otherusr);
        currentuser = req.loggedUser;


        const room = await ConversationBetween.find(sender_id = currentuser.id,receiver_id = otherusr.id).select(

        );
        convid = room.conversation_id
        const msges = await Message.find(conversation_id=convid).select(
            '_id,message'
        )
        console.log(msges);
        return res.status(200).json(room);
    
    }
    catch (error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});    }
});


router.get("/allmessages",async(req,res) => {
    try{
        const messages = await Message.find().select(
                "_id,conversation_id,content,enum"
        );
        console.log(messages);
        return res.status(200).json(messages);

    }
    catch (error){
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
});

router.post("/postmessage",async(req,res) => {
    verifyToken,
    verifyUserWithToken,
    async(req,res) => {
        const validatedData = ChatCreate(req.body);
        if(validatedData.error)
            return res.status(400).json({ message: validatedData.error.details[0].message});

        const msg = new Message({
            id : req.body.id,
            conversation_id : req.body.conversation_id,
            content : req.body.content,
            enum : req.body.enum
        });

        try{
            const savedmsg = await msg.save();
            res.json(savedmsg);
        }
        catch (err) {
            res.status(500).json({message:err})
        }
        }
})

router.post("/conversationmsg",verifyUserWithToken,verifyToken,
    async (req,res) => {
        const validatedData = Conversation(req.body);
        if (validatedData.error)
            return res.status(400).json({message: validatedData.error.details[0].message })

        const conv = new ConversationBetween({
            id : req.body.id,
            sender_id : req.body.sender_id,
            receiver_id : req.body.receiver_id,
            last_msg_id : req.body.last_msg_id,
            last_msg_date : req.body.last_msg_date
        });
        try {
            const savedconv = await conv.save();
            res.json(savedconv);
        }
        catch (err){
                res.status(500).json({message:err});
        }
    }

    );


router.post("/usersofchat",verifyToken,verifyUserWithToken,

    async(req,res) => {
        const validatedData = Userdata(req.body);
        if(validatedData.error)
            return res.status(400).json({ message: validatedData.error.details[0].message });

            user = req.loggedUser;
            console.log(user);
        const usr = new UsersofChat({
            sender_id:user,
            receiver_id:req.user.userName,
            timestamp = Date.now()
        });
        try{
            const saveduser = await usr.save();
            res.json(saveduser);
        }
        catch (err){
            res.status(500).json({message:err});
        }
    }
)

const server = chatServer.server
let io = socket(server);

io.on("connection", (socket) => {

    socket.on("new-message", (data) => {
        io.sockets.emit("new-message", data);
    });

});

module.exports = router;