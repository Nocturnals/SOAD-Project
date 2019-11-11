const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash"); // for modifing the array contents

const UserModel = require("../../models/user");
const { MailingService } = require("../../services/mailer");
const { verifyToken, verifyUserWithToken } = require("./helper");
const { RegistrerValidation, LoginValidation } = require("./authValidation");

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
    try {
        const emailExists = await UserModel.findOne({ email: req.body.email });
    } catch (error) {
        return res.status(500).json({ message: "Database didn't respond" });
    }
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
        expiresIn: "1d"
    });

    res.status(200)
        .header("authorization", jToken)
        .json(_.pick(user, ["_id", "name", "email"]));
});

// route to load get a userby id
router.get("/user", verifyToken, verifyUserWithToken, (req, res) => {
    return res.status(200).json({ user: req.loggedUser });
});

// route to verify email of given user
router.post(
    "/sendEmailVerification",
    verifyToken,
    verifyUserWithToken,
    (req, res, next) => {
        const jToken = jwt.sign(
            { _id: req.loggedUser._id },
            process.env.MAIL_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // email verification link
        const verification_link = `http://${req.get(
            "host"
        )}/api/auth/emailVerify/${jToken}`;

        try {
            // send the mail
            const sentStatus = MailingService.Sendmail(
                `To Verify your account click the link <br> ${verification_link} <br> The above link expires in one day`,
                req.loggedUser.email,
                "Email confirmation"
            );

            return res
                .status(200)
                .json({
                    message: "Mail with verification link Sent to your mail"
                });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

// router to verify the token for email verification
router.get("/emailVerify/:jToken", async (req, res) => {
    // verify the jwtoken from the url
    jwt.verify(
        req.params.jToken,
        process.env.MAIL_SECRET,
        async (err, authData) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Token" });
            } else {
                try {
                    // finds the user document
                    const user = await UserModel.findById({
                        _id: authData._id
                    });

                    // verify the email of the user
                    user.emailVerified = true;
                    const verifiedUser = await user.save();
                    res.status(200).json({
                        message: `${verifiedUser.email} is verified`
                    });
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: "Internal server error" });
                }
            }
        }
    );
});

// testing routes
router.get("/test", (req, res) => {
    return res.json({ message: "working perfectly" });
});

// exports the routers
module.exports = router;
