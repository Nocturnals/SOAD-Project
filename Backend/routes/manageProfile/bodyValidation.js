const Joi = require("@hapi/joi");

exports.addfollowerValidation = data => {
    const schema = {
        otherUserId: Joi.string().required()
    };

    return Joi.validate(data, schema);
};
