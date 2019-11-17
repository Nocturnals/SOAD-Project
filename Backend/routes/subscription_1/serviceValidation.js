const Joi = require("@hapi/joi");

const addtoplanValidation = data => {
    const schema = {
        postid: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(data, schema);
};

module.exports = {
    addtoplanValidation
};
