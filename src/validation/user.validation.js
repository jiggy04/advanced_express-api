// Validation schema for user registration and login using Joi

const Joi = require('joi');

const registerSchema = Joi.object({
        name: Joi.string().trim().min(2).required().messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters"
        }),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(6).required()
    }).options({
            allowUnknown: false
        })

    // const registerValidation = (req, res, next) => {
    //     const {error} = registerSchema.validate(req.body, {abortEarly: false});
    //     if (error) {
    //         return res.status(400).json({ message: error.details.map(err => err.message)})
    //     }
    //     next();
    // }


const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
    }).options({
        abortEarly: false
    }).options({allowUnknown: false});

    const validate = (schema) => {
        return (req, res, next) => {
            const {error, value} = schema.validate(req.body, {
                abortEarly: false
            });

            if(error) {
            return res.status(400).json({
                message: error.details.map(err =>err.message)
            });
        }
        req.body = value;
        next();
        };
    };



    // const loginValidation = (req, res, next) => {
    //     const {error} = loginSchema.validate(req.body);
    //     if (error) {
    //         return res.status(400).json({message: error.details[0].message})
    // };
    // next();
    // }


    module.exports = {
        registerValidation: validate(registerSchema),
        loginValidation: validate(loginSchema)
    }

 