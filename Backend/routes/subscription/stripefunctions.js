const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const router = express.Router();
const {
    getAllProductsAndPlans,
    // createProduct,
    // createPlan,
    createCustomerAndSubscription
} = require("./utils");

const { subscribeValidation } = require("./subscriptionValidation");

router.post(
    "/plans",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            return res.send(getAllProductsAndPlans);
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
            return res.send(createCustomerAndSubscription(req.body));
        } catch (error) {
            return res
                .status(500)
                .json({ message: "internal server error(Stripe)" });
        }
    }
);

module.exports = router;
