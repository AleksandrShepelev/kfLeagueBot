const utils = require("../utils");
const constants = require("../config/constants");
const Session = require('../db/session');

const create = async (userId) => {
    const id = utils.generateRandomId();
    //TODO: check uniquiness
    await Session.create(
        {
            id,
            player1: {
                id: userId,
                message: null,
            },
            player2: {
                id: null,
                message: null,
            }
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

const addMessage = async (sessionId, userId, msg) => {
    const session = await get(sessionId);
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

    if (player.message) {
        throw new Error(constants.ERROR_MESSAGE_ALREADY_SAVED);
    }

    player.message = msg;

    await session.save();
};


const getMessages = async (sessionId) => {
    const session = await get(sessionId);
    if (!session.player1.message || !session.player2.message) {
        throw new Error(constants.ERROR_PLAYERS_DID_NOT_SEND)
    }

    return {
        "player_1_id": session.player1.id,
        "player_2_id": session.player2.id,
        "message": `${constants.MESSAGE_SESSION_ID} ${sessionId}; ${constants.MESSAGE_PLAYER_1_SAID} ${session.player1.message}; ${constants.MESSAGE_PLAYER_2_SAID} ${session.player2.message}`
    }
};

module.exports = {
    getMessages,
    create,
    join,
    get,
    addMessage,
};
