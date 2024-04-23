const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.createJwt = async (user) => {
    try {
        const token = jwt.sign({ data: user },process.env.SECRETKEY, { expiresIn: '5h' });
        return token;
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
};