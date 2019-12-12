const Joi = require("@hapi/joi");

const interestedInWorkValidation = data => {
    const schema = {
        legalName: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),
        address: Joi.string().required(),
        artistType: Joi.string().required(),
        description: Joi.string().required(),
        availableLocation: Joi.string().required(),
        availableFrom: Joi.string().required(),
        availableTill: Joi.string().required(),
        portpolioSite: Joi.string()
            .allow("")
            .required()
    };

    return Joi.validate(data, schema);
};

const artistWantedValidation = data => {
    const schema = {
        artistType: Joi.string().required(),
        title: Joi.string().required(),
        workAt: Joi.string().required(),
        workDuration: Joi.string().required(),
        workType: Joi.string().required(),
        salary: Joi.string().required(),
        descriptionOfJob: Joi.string().required(),
        qualifications: Joi.string().required(),
        responsibilities: Joi.string().required()
    };

    return Joi.validate(data, schema);
};

const applyJobValidation = data => {
    const schema = {
        jobOfferId: Joi.string().required()
    };

    return Joi.validate(data, schema);
};

const findJobOffersValidation = data => {
    const schema = {
        options: {
            artistType: Joi.string()
                .allow("")
                .required(),
            workAt: Joi.string()
                .allow("")
                .required(),
            workTypes: Joi.array().required()
        }
    };

    return Joi.validate(data, schema);
};

module.exports = {
    interestedInWorkValidation,
    artistWantedValidation,
    applyJobValidation,
    findJobOffersValidation
};
