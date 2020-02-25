const Deck = require('../db/deck');

const getByName = async (name) => {
    return  await Deck.findOne({name});
};
const getList = async (username) => {
    return  await Deck.find({username});
};

const getListInTextFormat = async (username) => {
    const decks = await getList(username);
    if (!decks.length) {
        return "У Вас нет ни одной колоды"
    }
    let message = "";
    for (const deck of decks) {
        message += deck.name;
        message += "\n";
        message += deck.url;
        message += "\n";
        message += "\n";
    }
    return message;
};

module.exports = {
    getList,
    getListInTextFormat,
    getByName
};
