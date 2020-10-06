const Joi = require("@hapi/joi");

const sendNotifactionValidation = data => {
    const schema = {
        userid: Joi.string()
            .min(4)
            .required(),
        message: Joi.string()
            .min(4)
            .required(),
        isread: Joi.boolean()
    };
    return Joi.validate(data, schema);
};

module.exports = {
    sendNotifactionValidation
};
