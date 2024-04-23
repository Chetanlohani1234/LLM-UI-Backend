const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        throw new Error('Password hashing failed');
    }
  };