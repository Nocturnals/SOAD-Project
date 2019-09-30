const express = require( 'express');

const helmet = require('helmet')
const morgan = require('morgan');
const dotenv = require( 'dotenv');
const mongoose = require( 'mongoose');

const authRouter = require( './routes/auth');

// load the local environment varaibles
dotenv.config();
const databaseConnect = process.env.DB_Connect;

// connect to mongooseDB
mongoose.connect(databaseConnect,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to mongooseDB');
    });

// intializing the app instance
const app = express();


// Middleware
app.use(express.json());        // for converting the json part of the request body
app.use(express.static('public'));

if(process.env.Node_Env === 'development') {
    app.use(morgan('tiny'));      // for logging the infomation
}


if (process.env.Node_Env === 'development') {
    app.use(helmet());      // for securing the routes with adding headers
    console.log('Logging the data using morgan');
}

// Route for login
app.use('/api/user', authRouter);

const port = process.env.port || 3000 

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}!!`);
});