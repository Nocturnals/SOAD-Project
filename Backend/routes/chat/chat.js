var express = require("express");

const Message = require('../../models/message');
const User = require('../../models/user');
const Otheruser = require('../../models/Otheruser');
const socket = require('socket.io');
const chatServer = require('../../server');
const bodyParser = require('body-parser')

const router = express.Router();

router.use(bodyParser.json());

// GET all the previous messages
router.get('/message', (req, res) => {
    Message.find({}).exec((err, messages) => {
        if(err) {
            res.send(err).status(500);
        } else {
            res.send(messages).status(200);
        }
    });
});

// POST a new message
router.post('/message', (req, res) => {
    Message.create(req.body).then((message) => {
        res.send(message).status(200);
    }).catch((err) => {
        console.log(err);
        res.send(err).status(500);
    });
});
const server = chatServer.server
let io = socket(server);

io.on("connection", (socket) => {

    socket.on("new-message", (data) => {
        io.sockets.emit("new-message", data);
    });

});

module.exports = router;
