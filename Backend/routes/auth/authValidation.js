const Joi = require("@hapi/joi");

const RegistrerValidation = data => {
    const schema = {
        name: Joi.string()
            .min(4)
            .max(255)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required()
    };

    return Joi.validate(data, schema);
};

const LoginValidation = data => {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required()
    };

    return Joi.validate(data, schema);
};

module.exports = {
    RegistrerValidation,
    LoginValidation
};
