const Joi = require("@hapi/joi");


const CompRegisterValidation = data => {
    const schema = {
        compid : Joi.string()
                .min(4)
                .required()
    }

    return Joi.validate(data,schema);
};


const CompCreateValidation = data => {
    const schema = {
        title : Joi.string()
                .min(4)
                .max(255)
                .required(),
        shortdescription : Joi.string()
                            .min(4)
                            .max(255)
                            .required(),
        fulldescription : Joi.string()
                            .min(4)
                            .required(),
        starttime : Joi.date()
                        .required(),

        endtime : Joi.date()
                     .required(),
        
    }

    return Joi.validate(data ,schema)
};


const deleteValidation = data =>{
    const schema = {
        compid : Joi.string()
                .min(4)
                .required()
}

return Joi.validate(data,schema);
};

const editValidation = data =>{
    const schema = {
        compid : Joi.string()
                .min(4)
                .required()
}

return Joi.validate(data,schema);
};



const hostValidation = data =>{
    const schema = {
        compid : Joi.string()
                .min(4)
                .required(),
        
        userid : Joi.string()
                    .min(4)
                    .required()
}

return Joi.validate(data,schema);
};

