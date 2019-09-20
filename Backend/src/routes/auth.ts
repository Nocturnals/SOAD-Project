import express, { Application, Request, Response, NextFunction } from 'express';
import { Router } from 'express-serve-static-core';

// const User = require('../models/user');
import { UserModel } from '../models/user';
import  mongoose  from 'mongoose';


const router: Router = express.Router();

// route to register new user
router.post('/register', async (req: Request, res: Response) => {
    const user: any = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    };
});

router.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

// route to login to account
router.post('/login', (req: Request, res: Response) => {
    res.send('Login page');
});

// exports the routers
export { router as authRouter };