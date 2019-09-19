import express, { Application, Request, Response, NextFunction } from 'express';
import { Router } from 'express-serve-static-core';

import dotenv from 'dotenv';

// const User = require('../models/user');
import { User } from '../models/user';


const router: Router = express.Router();

// route to register new user
router.post('/register', (req: Request, res: Response) => {
    const user: any = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log(user);
    res.send(user);
});

router.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

// route to login to account
router.post('/login', (req: Request, res: Response) => {
    res.send('Login page');
});

// exports the routers
export {router as authRouter};