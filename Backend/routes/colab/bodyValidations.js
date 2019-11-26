const Joi = require("@hapi/joi");

const interestedInWorkValidation = data => {
    const schema = {
        availableAt: Joi.string().required(),

        freeTimeFrom: Joi.number()
            .integer()
            .required(),

        freeTimeTill: Joi.number()
            .integer()
            .required(),

        portpolioSite: Joi.string(),

        cvLocation: Joi.string().required()
    };

    return Joi.validate(data, schema);
};

const artistWantedValidation = data => {
    const schema = {
        workDuration: Joi.string().required(),

        salary: Joi.string().required(),

        workAt: Joi.string().required(),

        descriptionOfJob: Joi.string()
    };

    return Joi.validate(data, schema);
};

const applyJobValidation = data => {
    const schema = {
        jobOfferId: Joi.string().required()
    };

    return Joi.validate(data, schema);
};

module.exports = {
    interestedInWorkValidation,
    artistWantedValidation,
    applyJobValidation
};
