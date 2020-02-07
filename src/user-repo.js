const sessions = require("./session-repo");
const constants = require("./constants");
const userDb = new Map();

/*
states:
no_session->in_session->no_session
no_session->will_join->in_session->no_session

 */


const create = (tgUserId, chatId) => {
    userDb.set(tgUserId, {
        chatId: chatId,
        currentSession: null,
        state: constants.STATE_NO_SESSION,
    });
    return get(tgUserId);
};

const get = (tgUserId) => {
    const user = userDb.get(tgUserId);
    if (!user) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }
    return user;
};

const createSession = (tgUserId) => {
    const user = userDb.get(tgUserId);
    if (!user) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }

    if (user.currentSession) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }

    user.currentSession = sessions.create(tgUserId);
    user.state = constants.STATE_IN_SESSION;
    return user.currentSession;
};

const resetSession = (tgUserId) => {
    const user = userDb.get(tgUserId);
    if (!user) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }
    user.currentSession = null;
    user.state = constants.STATE_NO_SESSION
};

const willJoinSession = (tgUserId) => {
    const user = userDb.get(tgUserId);
    if (!user) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }
    if (user.currentSession) {
        throw new Error(constants.ERROR_ALREADY_HAS_SESSION);
    }

    user.state = constants.STATE_WILL_JOIN;
};

const joinSession = (tgUserId, sessionId) => {
    const user = userDb.get(tgUserId);
    if (!user) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }
    if (user.currentSession) {
        throw new Error(constants.ERROR_ALREADY_HAS_SESSION);
    }
    sessions.join(sessionId, tgUserId);
    user.currentSession = sessionId;
    user.state = constants.STATE_IN_SESSION
};

const addMessageToSession = (tgUserId, msg) => {
    const user = userDb.get(tgUserId);
    if (!user) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }
    if (!user.currentSession) {
        throw new Error(constants.ERROR_USER_HAS_NO_SESSION);
    }
    sessions.addMessage(user.currentSession, tgUserId, msg);

    try {
        return sessions.getMessages(user.currentSession);
    } catch (err) {
        if (err.message === constants.ERROR_PLAYERS_DID_NOT_SEND) {
            return null;
        }
        throw err;
    }
};

module.exports = {
    create,
    get,
    addMessageToSession,
    createSession,
    joinSession,
    resetSession,
    willJoinSession
};