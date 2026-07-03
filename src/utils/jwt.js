const jwt = require ('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN ||'7d'});
}
const verifyToken = (token) => {
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error(error)
        throw new Error('Invalid or expired token');
    }
}


module.exports = {generateToken, verifyToken}