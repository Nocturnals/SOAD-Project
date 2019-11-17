const Joi = require("@hapi/joi");

const subscribeValidation = data => {
    const schema = {
        stripeToken: Joi.string()
            .min(4)
            .required(),
        customerEmail: Joi.string()
            .min(4)
            .required(),
        planId: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(data, schema);
};

module.exports = {
    subscribeValidation
};
