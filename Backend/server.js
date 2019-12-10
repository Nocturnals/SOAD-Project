const path = require("path");
const express = require("express");

const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const docMatch = require("./routes/docMatching/documentMatching");

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
app.use("/api/docMatch", docMatch);
app.use("/api/auth", require("./routes/auth"));

//Route for Competitions
app.use("/api/competition", require("./routes/competitions/utils"));

//Route for Posts
app.use("/api/post", require("./routes/posts/post"));

// Route for Subscriptions
app.use("/api/subscriptions", require("./routes/subscription_1/service"));

// route for colabaration
app.use("/api/colab", require("./routes/colab"));

// Route for notifications

app.use("/api/notifications", require("./routes/notifications/utils"));
// app.use("api/subscription", require("./routes/subscription/stripefunctions"));

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
app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}!!`);
});
