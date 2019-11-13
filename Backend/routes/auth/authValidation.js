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

const EmailIDValidation = data => {
    const schema = {
        email: Joi.string()
            .required()
            .email()
    };

    return Joi.validate(data, schema);
};

const passwordValidation = data => {
    const schema = {
        password: Joi.string()
            .min(8)
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
    };

    return Joi.validate(data, schema);
};

const editProfileValidation = data => {
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
        dateofbirth: Joi.date().required()
    };

    return Joi.validate(data, schema);
};

module.exports = {
    RegistrerValidation,
    LoginValidation,
    EmailIDValidation,
    passwordValidation,
    editProfileValidation
};
