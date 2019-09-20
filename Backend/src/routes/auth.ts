import express, { Application, Request, Response, NextFunction } from 'express';
import { Router } from 'express-serve-static-core';

import bcrypt from 'bcryptjs';

// const User = require('../models/user');
import { UserModel } from '../models/user';
import { RegistrerValidation, LoginValidation } from './authValidation';

// intance of a router
const router: Router = express.Router();

// route to register new user
router.post('/register', async (req: Request, res: Response) => {

    // validate the given user details
    const validatedData = RegistrerValidation(req.body);
    if (validatedData.error) return res.status(400).json({'Error_message': validatedData.error.details[0].message});

    // check user if already exists and give error
    const emailExists = await UserModel.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists!');

    
    // hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user instance
    const user: any = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    // save the user to cloud or database
    try{
        var savedUser = await user.save();
        delete savedUser.password;
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    };
});

// route to login to account
router.post('/login', async (req: Request, res: Response) => {
    
    // validate the user inputs
    const validatedData = LoginValidation(req.body);
    if (validatedData.error) return res.status(400).json({'Error_message': validatedData.error.details[0].message}); 

    // Check email exists or not
    const user = await UserModel.findOne({email: req.body.email});
    if (!user) return res.status(400).json({'Error_message': 'Email Doesn\'t exists!'});

    // Check user password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({'Error_message': 'Password is invalid'});

    res.status(200).json(user);
});

// exports the routers
export { router as authRouter };