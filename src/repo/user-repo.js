const sessions = require("./session-repo");
const constants = require("../config/constants");
const User = require("../db/user");
/*
states:
no_session->in_session->no_session
no_session->will_join->in_session->no_session

 */


const create = async (tgUserId, chatId) => {
    await User.create(
        {
            id: tgUserId,
            chatId: chatId,
            currentSession: null,
            state: constants.STATE_NO_SESSION,
        }
    );
    return get(tgUserId);
};

const get = async (tgUserId) => {
    const user = await User.findOne({id:tgUserId});
    if (!user) {
        throw new Error(constants.ERROR_USER_NOT_EXISTS);
    }
    return user;
};

const createSession = async (tgUserId) => {
    const user = await get(tgUserId);

    if (user.currentSession) {
        throw new Error(constants.ERROR_ALREADY_HAS_SESSION);
    }

    user.currentSession = await sessions.create(tgUserId);
    user.state = constants.STATE_IN_SESSION;
    await user.save();
    return user.currentSession;
};

const resetSession = async (tgUserId) => {
    const user = await get(tgUserId);
    user.currentSession = null;
    user.state = constants.STATE_NO_SESSION;
    await user.save();
};

const willJoinSession = async (tgUserId) => {
    const user = await get(tgUserId);
    if (user.currentSession) {
        throw new Error(constants.ERROR_ALREADY_HAS_SESSION);
    }

    user.state = constants.STATE_WILL_JOIN;
    await user.save();
};

const joinSession = async (tgUserId, sessionId) => {
    const user = await get(tgUserId);
    if (user.currentSession) {
        throw new Error(constants.ERROR_ALREADY_HAS_SESSION);
    }
    await sessions.join(sessionId, tgUserId);
    user.currentSession = sessionId;
    user.state = constants.STATE_IN_SESSION;
    await user.save();
};

const addMessageToSession = async (tgUserId, msg) => {
    const user = await get(tgUserId);
    if (!user.currentSession) {
        throw new Error(constants.ERROR_USER_HAS_NO_SESSION);
    }
    await sessions.addMessage(user.currentSession, tgUserId, msg);

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