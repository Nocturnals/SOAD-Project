const Joi = require("@hapi/joi");

const registerforplanValidation = data => {
    const schema = {
        service: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(data, schema);
};

module.exports = {
    registerforplanValidation
};
