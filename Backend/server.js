const express = require( 'express');

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
app.use(express.json());

// Route for login
app.use('/api/user', authRouter);

app.listen(3000, () => {
    console.log('Server is up and running!!');
});