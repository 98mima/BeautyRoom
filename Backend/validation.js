const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastname: Joi.string().min(3),
        address: Joi.string().min(6).required(),
        number: Joi.number().min(6).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};
const productValidation = (data) => { 
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required()
    });
    return schema.validate(data);
}
const orderValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string()
    });
    return schema.validate(data);
}

module.exports.orderValidation = orderValidation;
module.exports.productValidation = productValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;