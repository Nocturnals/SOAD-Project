const Joi = require("@hapi/joi");

const ChatCreate = data=>{
    const schema = {
        id:Joi.string()
            .required(),
        conversation_id:Joi.string()
            .required(),
        content:Joi.string()
            .min(1)
            .required(),
        enum : Joi.string().valid('sent')
                  
    }
    return Joi.validate(data,schema);
};

const Userdata = data=>{
    const schema = {
        sender_id : Joi.string()
                    .required(),
        receiver_id : Joi.string()
                    .required()
    }
    return Joi.validate(data,schema);
}

const Conversation = data=>{
    const schema = {
        conversation_id : Joi.string()
                        .required(),
        sender_id:Joi.string()
                    .required(),
        receiver_id:Joi.string()
                    .required(),
        last_msg_id : Joi.string()
                    .required(),
        last_msg_date : Joi.string()
                    .required()
    }
    return Joi.validate(data,schema);
}

module.exports = {
    Conversation,
    ChatCreate,
    Userdata
}