const path = require("path");
const express = require("express");

const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const docMatch = require("./routes/docMatching/documentMatching");
const ChatController = require("./routes/chat/chatapp");

const chatrouter = express.Router();

// chatrouter.get("/lastMessages", ChatController.getConversations);
// chatrouter.get("/:conversationId", ChatController.getConversation);
// chatrouter.post("/:conversationId", ChatController.sendReply);
// chatrouter.post("/new/:recipient", ChatController.newConversation);

// load the local environment varaibles
dotenv.config();
const databaseConnect = process.env.DB_Connect;

// connect to mongooseDB
mongoose.connect(
    databaseConnect,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to mongooseDB");
    }
);

// intializing the app instance
const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    // website which can only access this backend server
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods which are allowed to this backend server
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    // Request headers which are allowed to this backend server
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.header("Access-Control-Expose-Headers", "*");

    // Pass to next layer
    next();
};

// Middleware
// for converting the json part of the request body
app.use(express.json());
app.use(bodyParser.json());

// for allowing requests from the frontend or other domains
app.use(allowCrossDomain);

if (process.env.Node_Env === "development") {
    // for logging the infomation
    app.use(morgan("tiny"));

    // for securing the routes with adding headers
    app.use(helmet());

    console.log("Logging the data using morgan");
}

// Route for login
app.use("/api/user", authRouter);

// Route for document matching api
app.use("/api/docMatch", docMatch);

// Route for authentication routes
app.use("/api/auth", require("./routes/auth"));

// Route for chatting api
app.use("/api/chat", ChatController);

//Route for Organisations
app.use("/api/organization", require("./routes/organizations/index"));
app.use("/editProfile", require("./routes/editProfile/index"));
//Route for Competitions
app.use("/api/competition", require("./routes/competitions/utils"));

//Route for Posts
app.use("/api/post", require("./routes/posts/post"));

// Route for Subscriptions
app.use("/api/subscriptions", require("./routes/subscription_1/service"));

// route for colabaration
app.use("/api/colab", require("./routes/colab"));

// route for service account registration
app.use("/api/serviceaccount", require("./routes/serviceaccount/index"));

// Route to manageUserProfile
app.use("/api/manageProfile", require("./routes/manageProfile/index"));

// Route for notifications
app.use("/api/notifications", require("./routes/notifications/utils"));
// app.use("api/subscription", require("./routes/subscription/stripefunctions"));

// Route for Service Accounts
app.use("/api/serviceaccount", require("./routes/serviceaccount/index"));

if (process.env.Node_Env === "production") {
    // for loading the static frontend app
    app.use(express.static("../frontend/build"));

    app.get("*", (req, res, next) => {
        res.sendFile(
            path.resolve(__dirname, "../frontend", "build", "index.html")
        );
    });
}

const port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}!!`);
});
module.exports = { server: server };
