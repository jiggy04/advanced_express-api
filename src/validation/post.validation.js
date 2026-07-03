// Validation schema for creating and updating articles using Joi

const Joi = require('joi');

const createArticleSchema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),
    images: Joi.array().items(Joi.string()).optional(),
    comments: Joi.array().items(Joi.object({
        body: Joi.string().min(10).required(),
        author: Joi.string().default('Guest'),
        date: Joi.date().default(Date.now)
    })),
    socialLinks: Joi.object({
        facebook: Joi.string().uri().optional(),
        X: Joi.string().uri().optional(),
        instagram: Joi.string().uri()
            .optional(),
        LinkedIn: Joi.string().uri().optional()
    })
});


const createArticleValidation = (req, res, next) => {
    const { error, value } = createArticleSchema.validate(req.body, {
        abortEarly: false
    })  //validate all field and returns error
    if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) })
    }
    next();
};




const updateArticleSchema = Joi.object({
    title: Joi.string().min(5).optional(),
    content: Joi.string().min(20).optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    comments: Joi.array().items(Joi.object({
        body: Joi.string().min(10),
        author: Joi.string().default('Guest'),
        date: Joi.date().default(Date.now)
    })),
    socialLinks: Joi.object({
        facebook: Joi.string().uri().optional(),
        X: Joi.string().uri().optional(),
        instagram: Joi.string().uri()
            .optional(),
        LinkedIn: Joi.string().uri().optional()
    })

})

const updateArticleValidation = (req, res, next) => {
    const { error, value } = updateArticleSchema.validate(req.body)  //validation: validate the request body against the schema
    if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) })
    }
    next();
}



module.exports = {
    createArticleValidation,
    updateArticleValidation
}
