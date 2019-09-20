import Joi from '@hapi/joi';

const RegistrerValidation = (data: object) => {
    const schema = {
        name: Joi.string().min(4).max(255).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(data, schema);
}

const LoginValidation = (data: object) => {
    const schema = {
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(data, schema);
}

export { RegistrerValidation, LoginValidation };