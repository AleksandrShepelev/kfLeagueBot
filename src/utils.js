var crypto = require("crypto");

const generateRandomId = () => crypto.randomBytes(4).toString('hex');

module.exports = {
    generateRandomId
};