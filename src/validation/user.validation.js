// Validation schema for user registration and login using Joi

const Joi = require('joi');

const registerSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    const registerValidation = (req, res, next) => {
        const {error} = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    }


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
    });


    const loginValidation = (req, res, next) => {
        const {error} = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message})
    };
    next();
    }


    module.exports = {
        registerValidation,
        loginValidation
    }

 