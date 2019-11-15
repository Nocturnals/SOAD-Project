const Joi = require("@hapi/joi");

const createPostValidation = data => {
  const schema = {
    title: Joi.string()
      .min(4)
      .max(255)
      .required(),
    content: Joi.string()
      .min(4)
      .max(25555)
      .required(),
  };

  return Joi.validate(data, schema);
};

const postLikeValidation = data => {
    const schema = {
      postId: Joi.string()
        .min(4)
        .required()
    };
  
    return Joi.validate(data, schema);
  };
  

const postUnlikeValidation = data => {
    const schema = {
      postId: Joi.string()
        .min(4)
        .required()
    };
  
    return Joi.validate(data, schema);
  };


const createCommentValidation = data => {
    const schema = {
      postId: Joi.string()
        .min(4)
        .required(),
      comment: Joi.string()
        .min(4)
        .max(25555)
        .required(),
    };
  
    return Joi.validate(data, schema);
  };

module.exports = {
    createPostValidation,
    postLikeValidation,
    postUnlikeValidation,
    createCommentValidation,
};
