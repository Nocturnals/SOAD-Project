const Joi = require("@hapi/joi");

const organizationValidation = data => {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date()
  };

  return Joi.validate(data, schema);
};

module.exports = { organizationValidation };
