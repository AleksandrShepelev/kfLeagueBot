const utils = require("../utils");
const constants = require("../config/constants");
const Session = require('../db/session');
const decks = require('./deck-repo');

const create = async (userId) => {
    const id = utils.generateRandomId();
    //TODO: check uniquiness
    await Session.create(
        {
            id,
            player1: {
                id: userId,
                ban: null,
                decks: [],
            },
            player2: {
                id: null,
                ban: null,
                decks: [],
            },
            state: "pick"
        }
    );

    return id;
};

const get = async (sessionId) => {
    const session = await Session.findOne({id: sessionId});
    if (!session) {
        throw new Error(constants.ERROR_NO_SESSION)
    }
    return session;
};

const join = async (sessionId, userId) => {
    const session = await get(sessionId);
    if (session.player2.id) {
        throw new Error(constants.ERROR_TWO_ALREADY_JOINED)
    }
    session.player2.id = userId;

    await session.save();
};

const addDeck = async (sessionId, userId, deckName) => {
    const session = await get(sessionId);
    const deck = await decks.getByName(deckName);
    const player = getPlayer(session, userId);
    player.decks.push({name: deck.name, url: deck.url});
    await session.save();
    return player.decks;
};

const getPlayer = (session, userId) => {
    let player = null;
    if (session.player1.id == userId) {
        player = session.player1;
    }
    if (session.player2.id == userId) {
        player = session.player2;
    }
    if (!player) {
        throw new Error(constants.ERROR_USER_NOT_IN_SESSION);
    }

    return player;
};

const getPlayerData = async(sessionId, userId) => {
    const session = await get(sessionId);
    return getPlayer(session, userId);
};

const addMessage = async (sessionId, userId, msg) => {
    const session = await get(sessionId);
    const player = getPlayer(session, userId);

    if (player.ban) {
        throw new Error(constants.ERROR_MESSAGE_ALREADY_SAVED);
    }

    player.ban = msg;

    await session.save();
};

const getPlayersDecks = async (sessionId) => {
    const session = await get(sessionId);
    if (session.player1.decks.length < 3 || session.player2.decks.length < 3) {
        throw new Error(constants.ERROR_PLAYERS_DID_NOT_CHOOSE_DECKS)
    }
    session.state = "ban";
    await session.save();
    return {
        player1: session.player1,
        player2: session.player2,
    }
};


const getMessages = async (sessionId) => {
    const session = await get(sessionId);
    if (!session.player1.ban || !session.player2.ban) {
        throw new Error(constants.ERROR_PLAYERS_DID_NOT_SEND)
    }

    return {
        "player_1_id": session.player1.id,
        "player_2_id": session.player2.id,
        "message": `${constants.MESSAGE_SESSION_ID} ${sessionId}; ${constants.MESSAGE_PLAYER_1_SAID} ${session.player1.ban}; ${constants.MESSAGE_PLAYER_2_SAID} ${session.player2.ban}`
    }
};

module.exports = {
    getMessages,
    create,
    join,
    get,
    addMessage,
    addDeck,
    getPlayersDecks,
    getPlayerData
};
