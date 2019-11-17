const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const router = express.Router();
const {
    getAllProductsAndPlans,
    // createProduct,
    // createPlan,
    createCustomerAndSubscription
} = require("./utils");

SubscriptionModel = require("./../../models/Subcriptions");
OtheruserModel = require("./../../models/Otheruser");

const { subscribeValidation } = require("./subscriptionValidation");

router.post(
    "/plans",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            const products = await getAllProductsAndPlans();
            return res.send(products);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "internal server error(Stripe)" });
        }
    }
);

router.post(
    "/subscribe",
    verifyToken,
    verifyUserWithToken,

    async (req, res, next) => {
        try {
            const validatedData = subscribeValidation(req.body);
            if (validatedData.error)
                return res
                    .status(400)
                    .json({ message: validatedData.error.details[0].message });

            const customer = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.name,
                profileurl: req.loggedUser.profileurl
            });
            try {
                await createCustomerAndSubscription(req.body, customer);
                return res.json({ message: "Successfully Subscribed" });
            } catch (error) {
                return res.json({ message: "Failed to subscribe" });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: "internal server error(Stripe)" });
        }
    }
);

module.exports = router;
