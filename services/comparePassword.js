const bcrypt = require('bcrypt');

module.exports.comparePasswords = async (password, bcrypts) => {
    try {
        if (!password || !bcrypts) {
            throw new Error('Both password and hashedPassword are required for comparison.');
        }

        const match = await bcrypt.compare(password, bcrypts);
        return match;
    } catch (error) {
        console.error(error);
        throw new Error('Password comparison failed');
    }
};