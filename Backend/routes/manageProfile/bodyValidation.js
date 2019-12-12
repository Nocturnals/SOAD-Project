const Joi = require("@hapi/joi");

exports.addfollowerValidation = data => {
    const schema = {
        otherUserId: Joi.string().uuid()
    };

    return Joi.validate(data, schema);
};
