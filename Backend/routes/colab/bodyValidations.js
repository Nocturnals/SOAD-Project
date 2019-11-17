const Joi = require("@hapi/joi");

const interestedInWorkValidation = data => {
    const schema = {
        artistType: Joi.string()
            .min(4)
            .max(255)
            .required(),

        availableAt: Joi.string().required(),

        freeTimeFrom: Joi.number()
            .integer()
            .required(),

        freeTimeTill: Joi.number()
            .integer()
            .required(),

        portpolioSite: Joi.string()
    };

    return Joi.validate(data, schema);
};

const artistWantedValidation = data => {
    const schema = {
        artistType: Joi.string().required(),

        availableAt: Joi.string().required(),

        workDuration: Joi.string().required(),

        salary: Joi.string()
            .integer()
            .required(),

        descriptionOfJob: Joi.string()
    };

    return Joi.validate(data, schema);
};

module.exports = { interestedInWorkValidation, artistWantedValidation };
