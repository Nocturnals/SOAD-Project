const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const NotificationsModel = require("../../models/Notifications");
const UserModel = require("./../../models/user");
const sendNotifactionValidation = require("./notificationValidation");

const router = express.Router();

router.get(
    "/allnotifications",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            // const user = await UserModel.findById(req.loggedUser.id);
            const notifs = await NotificationsModel.find();
            user_notifications = [];
            notifs.forEach(i => {
                if (
                    JSON.stringify(notifs[i].userid) ==
                    JSON.stringify(req.loggedUSer._id)
                ) {
                    user_notifications.push(notifs[i]);
                }
            });

            if (!user_notifications) {
                return res.status(200).json(user_notifications);
            } else {
                return res.status(200).json({ message: "No Notifications" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

router.post(
    "sendnotification",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = sendNotifactionValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        const notif = new NotificationsModel({
            userid: req.body.userid,
            message: req.body.message,
            isread: false
        });

        try {
            const savednotif = await notif.save();
            return res.json(savednotif);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
);

router.patch(
    "markasread",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            const notif = await NotificationsModel.findById(req.body._id);
            if (!notif.isread) {
                notif.isread = true;
            }
            const savdnotif = await notif.save();
            return res.json(savednotif);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
);
