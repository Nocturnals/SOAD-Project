import express, { Application, Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { authRouter } from './routes/auth';

// load the local environment varaibles
dotenv.config();
const databaseConnect: any = process.env.DB_Connect;

// connect to mongooseDB
mongoose.connect(databaseConnect,
{ useNewUrlParser: true },
() => {
    console.log('connected to mongooseDB');
});

// intializinf the app instance
const app: Application = express();


// Middleware
app.use(express.json());

// Route for login
app.use('/api/user', authRouter);

app.listen(3000, () => {
    console.log('Server is up and running!!');
});