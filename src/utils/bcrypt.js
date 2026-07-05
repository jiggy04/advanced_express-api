// Utility function to hash passwords using bcrypt

const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed
}

 const comparePassword = async (password, hashedPassword) => {
            return await bcrypt.compare(password, hashedPassword)
        };

module.exports = {
    hashPassword,
    comparePassword
};
