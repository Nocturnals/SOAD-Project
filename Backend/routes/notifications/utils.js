const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const NotificationsModel = require("../../models/Notifications");
const UserModel = require("./../../models/user");
const { sendNotifactionValidation } = require("./notificationValidation");

const router = express.Router();

router.get(
    "/allnotifications",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            // const user = await UserModel.findById(req.loggedUser.id);
            const notifs = await NotificationsModel.find();
            console.log(notifs);
            user_notifications = [];
            // console.log(notifs[0].userid);
            // console.log(req.loggedUser._id);
            notifs.forEach(i => {
                console.log(i.userid);
                if (
                    JSON.stringify(i.userid) ==
                    JSON.stringify(req.loggedUser._id)
                ) {
                    user_notifications.push(i);
                }
            });
            console.log(user_notifications);

            if (user_notifications) {
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
    "/sendnotification",
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
            url: req.body.url,
            isread: false
        });

        console.log(notif);

        try {
            const savednotif = await notif.save();
            return res.json(savednotif);
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }
);

router.patch(
    "/markasread",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            const notif = await NotificationsModel.findById(req.body._id);
            if (!notif.isread) {
                notif.isread = true;
            }
            const savednotif = await notif.save();
            return res.json(savednotif);
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }
);

module.exports = router;
