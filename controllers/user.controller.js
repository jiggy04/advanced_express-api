const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken'); 
const bcrypt = require ('bcrypt');
const Joi = require('joi');
   
const registerUser = async (req, res, next) =>
{
    const registerSchema = joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const {error} = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message})
    };

   try {
     const {email,password, name} = req.body

     const existingUser = await userModel.findOne({email:email});
     if(existingUser) {
        return res.status(400).json({message: 'User already exists'})
     };

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);

    const user = new userModel({
        email: email,
        password: hashed,
        name: name
    });

    await user.save();

    return res.status(200).json({message: 'User registered successfully.'})

   } catch (error) {
    next(error)
   };
};

const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const {error} = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
 
    try {
        const {email, password} = req.body;   
        const user = await userModel.findOne({email: email});
    if(!user) {
        return res.status(400).json({message: 'User does not exist'})
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {return res.status(400).json({message: 'Invalid Credentials'})};

    const token = jwt.sign(
        {userId: user._id, name: user.name},
        process.env.JWT_SECRET,  
        {expiresIn: '7d'}
    )

    const resUser = {
        _id: user._id,
        email: user.email,
        name: user.name
    }

    return res.status(200).json({message: 'Logged in successfully', user: resUser, token})
    } catch (error) {
        next(error)
    };

    
} 

module.exports = {registerUser, loginUser}

 