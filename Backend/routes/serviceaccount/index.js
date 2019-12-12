const express = require("express");
const uniqid = require("uniqid");

const { verifyToken, verifyUserWithToken } = require("./../auth/helper");

const { ServiceaccountModel } = require("./../../models/serviceaccount");
const services = require("./../../models/services");
const { registerforplanValidation } = require("./serviceaccountValidation");
const router = express.Router();

router.get(
    "/allservices",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            if (services) {
                return res.json(services);
            } else {
                return res.json({ message: "There are no services" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Eroor" });
        }
    }
);

router.post(
    "/registerforservice",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = registerforplanValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            const account = new ServiceaccountModel({
                userid: req.loggedUser._id,
                service: req.body.service,
                key: uniqid()
            });
            console.log(account);
            account.save();
            return res.json(account);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

module.exports = router;
