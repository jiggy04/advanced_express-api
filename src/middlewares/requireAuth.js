// Middleware to require authentication for protected routes

// const userModel = require('../models/user.model');  
const {verifyToken} = require('../utils/jwt');



const requireAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ error: 'Access denied, no token' })

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);


            // GRAY THE FOLLOWING LINES TO AVOID UNNECESARY DATABASE QUERY SINCE THE TOKEN ALREADY CONTAINS USER INFO
        // const user = await userModel.findById(decoded.userId);

        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' })
        // }
        req.user = decoded;
        next()

    } catch (error) {
        return res.status(401).json({ error: error.message});

    }
};


module.exports = requireAuth;