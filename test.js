var crypto = require("crypto");


const main = () => {
    console.log(crypto.randomBytes(4).toString('hex'));
};

main();