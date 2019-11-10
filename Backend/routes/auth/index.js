const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash"); // for modifing the array contents

const UserModel = require("../../models/user");
const { verifyToken } = require("./helper");
const {
    RegistrerValidation,
    LoginValidation,
    UserIDValidation
} = require("./authValidation");

// intance of a router
const router = express.Router();

// route to register new user
router.post("/register", async (req, res) => {
    // validate the given user details
    const validatedData = RegistrerValidation(req.body);
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });

    // check user if already exists and give error
    const emailExists = await UserModel.findOne({ email: req.body.email });
    if (emailExists)
        return res.status(400).json({ message: "Email already exists!" });

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
    try {
        var savedUser = await user.save();
        res.send(_.pick(savedUser, ["_id", "name", "email"]));
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// route to login to account
router.post("/login", async (req, res) => {
    // validate the user inputs
    const validatedData = LoginValidation(req.body);
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });

    // Check email exists or not
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ message: "Email Doesn't exists!" });

    // Check user password
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!validPassword)
        return res.status(400).json({ message: "Password is invalid" });

    // Assign a json web token
    const tokenSecret = process.env.Token_Secret;
    const jToken = jwt.sign({ _id: user._id }, tokenSecret, {
        expiresIn: "1hr"
    });

    res.status(200)
        .header("Authorization", jToken)
        .json(_.pick(user, ["_id", "name", "email"]));
});

// route to load get a userby id
router.get("/user", verifyToken, async (req, res, next) => {
    // checks the correct format of the fields
    const validateData = UserIDValidation(req.body);
    if (validateData.error) {
        return res.status(400).json({ message: "Field with userid is needed" });
    }

    // verifies the given token is correct and gets the user data
    jwt.verify(req.token, process.env.Token_Secret, async (err, authData) => {
        if (err) {
            return res.status(401).json({ message: "Access Denied" });
        } else {
            const loggedUser = await UserModel.findById(authData._id).select(
                "-password"
            );
            if (!loggedUser) {
                return res.status(400).json({
                    message: "No user exists with given id"
                });
            } else {
                if (req.body.user._id == loggedUser._id) {
                    return res
                        .status(200)
                        .json(_.pick(loggedUser, ["_id", "name", "email"]));
                } else {
                    return res.status(401).json({ message: "Access Denied" });
                }
            }
        }
    });
});

// exports the routers
module.exports = router;
