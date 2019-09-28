const express = require('express');

const bcrypt = require('bcryptjs');
jwt = require('jsonwebtoken');

const UserModel = require('../models/user')
const { RegistrerValidation, LoginValidation } = require('./authValidation')

// intance of a router
const router = express.Router();

// route to register new user
router.post('/register', async (req, res) => {

    // validate the given user details
    const validatedData = RegistrerValidation(req.body);
    if (validatedData.error) return res.status(400).json({Error_message: validatedData.error.details[0].message});

    // check user if already exists and give error
    const emailExists = await UserModel.findOne({email: req.body.email});
    if (emailExists) return res.status(400).json({Error_message: 'Email already exists!'});

    
    // hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user instance
    const user = new UserModel({
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
        res.status(400).json({Error_message: err});
    };
});

// route to login to account
router.post('/login', async (req, res) => {
    
    // validate the user inputs
    const validatedData = LoginValidation(req.body);
    if (validatedData.error) return res.status(400).json({Error_message: validatedData.error.details[0].message}); 

    // Check email exists or not
    const user = await UserModel.findOne({email: req.body.email});
    if (!user) return res.status(400).json({Error_message: 'Email Doesn\'t exists!'});

    // Check user password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({Error_message: 'Password is invalid'});

    // Assign a json web token
    const tokenSecret = process.env.Token_Secret;
    const jToken = jwt.sign({_id: user._id}, tokenSecret, { expiresIn: '1hr' });
    res.status(200).header('auth-token', jToken).json(user);

});


router.get('/viewpost1', verifyToken ,(req, res) => {
    jwt.verify(req.token, process.env.Token_Secret, (err, authData) => {
        if(err) {
            res.status(401).json({Error_Message: 'Access Denied'})
        } else {
            res.json({message: 'asdfkljsdf'});
        }
    });
})

// verify the token for authentication
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split the header
        const bearer = bearerHeader.split(' ');
        // Get the token 
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken;

        // run the next function
        next()
    } else {
        res.status(401).json({'message': 'Access Denied'});
    }
}

// exports the routers
module.exports = router