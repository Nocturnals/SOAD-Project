const express = require("express");
const uniqid = require("uniqid");

const { verifyToken, verifyUserWithToken } = require("./../auth/helper");

const { ServiceaccountModel } = require("./../../models/serviceaccount");
const services = require("./../../models/services");
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
        try {
            const account = new ServiceaccountModel({
                userid: req.loggedUser._id,
                service: req.body.service,
                key: uniqid()
            });
            const savedaccount = account.save();
            return res.json(savedaccount);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);
