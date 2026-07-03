// User controller to handle user registration and login

const userModel = require('../models/user.model');
const {generateToken} = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/bcrypt');

const registerUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        };

        const hashed = await hashPassword(password);

       

        const user = new userModel({
            email,
            password: hashed,
            name
        });

        await user.save();

        return res.status(200).json({ message: 'User registered successfully.' })

    } catch (error) {
        next(error)
    };
};

const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) { 
            return res.status(400).json({ message: 'User does not exist' })
        };

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) { return res.status(400).json({ message: 'Invalid Credentials' }) };

        const token = generateToken(
            { userId: user._id,
            name: user.name }
        )

        const resUser = {
            _id: user._id,
            email: user.email,
            name: user.name
        }

        return res.status(200).json({ message: 'Logged in successfully', user: resUser, token })
    } catch (error) {
        next(error)
    };


}

module.exports = { registerUser, loginUser }

