/* Server Side -- Stripe API calls */
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const UTILS = require("./format-numbers");
SubscriptionModel = require("./../../models/Subcriptions");

function getAllProductsAndPlans() {
    return Promise.all([stripe.products.list({}), stripe.plans.list({})]).then(
        stripeData => {
            var products = stripeData[0].data;
            var plans = stripeData[1].data;

            // console.log(stripeData[0].data);
            // console.log(stripeData[1].data);

            plans = plans
                .sort((a, b) => {
                    return a.amount - b.amount;
                })
                .map(plan => {
                    /* Format plan price (amount) */
                    amount = UTILS.formatINR(plan.amount);
                    return { ...plan, amount };
                });

            console.log(plans);
            products.forEach(product => {
                const filteredPlans = plans.filter(plan => {
                    return plan.product === product.id;
                });

                product.plans = filteredPlans;
            });

            return products;
        }
    );
}

async function createCustomerAndSubscription(requestBody, user) {
    try{
     return stripe.customers
        .create({
            source: requestBody.stripeToken,
            email: requestBody.customerEmail
        })
        .then(customer => {
            const customerID = customer.id;
            stripe.subscriptions.create(
                {
                    customer: customer.id,
                    items: [
                        {
                            plan: requestBody.planId
                        }
                    ]
                }.then(subscription => {
                    const subscriptionID = subscription.id;
                    const subscription = new SubscriptionModel({
                        customerId: customerID,
                        subscriptionId: subscriptionID,
                        planId: requestBody.planId,
                        customer: user,
                        plan: requestBody.plan
                    });
                    await subscription.save()
                })
            );
        });

       
}
catch (error){
    console.log(error);
}
}

module.exports = {
    getAllProductsAndPlans,
    // createProduct,
    // createPlan,
    createCustomerAndSubscription
};
