const Joi = require("@hapi/joi");

const organizationValidation = data => {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date()
  };

  return Joi.validate(data, schema);
};

const requestUserValidation = data => {
  const schema = {
    organizationId: Joi.string().required(),
    userIds: Joi.string().required()
  };

  return Joi.validate(data, schema);
};

const addUserValidation = data => {
  const schema = {
    userId: Joi.string().required(),
    orgName: Joi.string().required(),
    check: Joi.bool().required()
  };

  return Joi.validate(data, schema);
};

const deleteValidation = data => {
  const schema = {
    userId: Joi.string().required(),
    orgName: Joi.string().required()
  };

  return Joi.validate(data, schema);
};

const findOrganizationValidation = data => {
  const schema = {
    name: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

module.exports = {
  organizationValidation,
  requestUserValidation,
  addUserValidation,
  deleteValidation,
  findOrganizationValidation
};
