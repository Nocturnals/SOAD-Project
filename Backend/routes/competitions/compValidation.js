const Joi = require("@hapi/joi");

const CompRegisterValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(data, schema);
};

const CompCreateValidation = data => {
    const schema = {
        title: Joi.string()
            .min(4)
            .max(255)
            .required(),
        shortdescription: Joi.string()
            .min(4)
            .max(255)
            .required(),
        fulldescription: Joi.string()
            .min(4)
            .required(),
        starttime: Joi.date().required(),

        endtime: Joi.date().required(),
        prize: Joi.string().required(),
        rules: Joi.string().required(),
        category: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(data, schema);
};

const deleteValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(data, schema);
};

const editValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required(),

        title: Joi.string()
            .min(4)
            .required(),

        shortdescription: Joi.string()
            .min(4)
            .required(),
        fulldescription: Joi.string()
            .min(4)
            .required(),
        starttime: Joi.date().required(),
        endtime: Joi.date().required(),
        rules: Joi.string()
            .min(4)
            .required(),
        prize: Joi.number().required(),
        category: Joi.string()
            .min(4)
            .required(),
        hosts: Joi.array(),
        comments: Joi.array(),
        faqs: Joi.array(),
        top10: Joi.array(),
        results: Joi.array(),
        noofparticipants: Joi.number(),
        participants: Joi.array()
    };

    return Joi.validate(data, schema);
};

const hostValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required(),

        userid: Joi.string()
            .min(4)
            .required()
    };

    return Joi.validate(data, schema);
};

const resultValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required(),

        score: Joi.number().required()
    };

    return Joi.validate(data, schema);
};

const edittitleValidation = data => {
    const schema = {
        title: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const editshortdescriptionValidation = data => {
    const schema = {
        shortdescription: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const editfulldescriptionValidation = data => {
    const schema = {
        fulldescription: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const editrulesValidation = data => {
    const schema = {
        rules: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const editprizeValidation = data => {
    const schema = {
        prize: Joi.number().required()
    };
    return Joi.validate(data, schema);
};

const editstarttimeValidation = data => {
    const schema = {
        starttime: Joi.date().required()
    };
    return Joi.validate(data, schema);
};

const editendtimeValidation = data => {
    const schema = {
        endtime: Joi.date().required()
    };
    return Joi.validate(data, schema);
};

const editcategoryValidation = data => {
    const schema = {
        category: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const editfaqValidation = data => {
    const schema = {
        question: Joi.string()
            .min(4)
            .required(),
        answer: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const editresultsValidation = data => {
    const schema = {
        id: Joi.string()
            .min(4)
            .required(),
        name: Joi.string()
            .min(4)
            .required(),
        score: Joi.number().required(),
        time: Joi.date().required()
    };
    return Joi.validate(data, schema);
};

const addcommentValidation = data => {
    const schema = {
        message: Joi.string()
            .min(4)
            .required()
        // likes: Joi.number()
    };
    return Joi.validate(data, schema);
};

const editcommentValidation = data => {
    const schema = {
        commentid: Joi.string()
            .min(4)
            .required(),
        message: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const commentlikeValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required(),
        commentid: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const commentreplyValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required(),
        commentid: Joi.string()
            .min(4)
            .required(),
        message: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const similarCompetitionValidation = data => {
    const schema = {
        _id: Joi.string()
            .min(4)
            .required()
    };
    return Joi.validate(data, schema);
};

const findcompetitionmathcValidation = data => {
    const schema = {
        name: Joi.string().required()
    };
    return Joi.validate(data, schema);
};

module.exports = {
    CompRegisterValidation,
    CompCreateValidation,
    deleteValidation,
    editValidation,
    hostValidation,
    resultValidation,
    editcategoryValidation,
    editendtimeValidation,
    editfulldescriptionValidation,
    editprizeValidation,
    editrulesValidation,
    editshortdescriptionValidation,
    editstarttimeValidation,
    edittitleValidation,
    editfaqValidation,
    editresultsValidation,
    addcommentValidation,
    editcommentValidation,
    commentlikeValidation,
    commentreplyValidation,
    similarCompetitionValidation,
    findcompetitionmathcValidation
};
