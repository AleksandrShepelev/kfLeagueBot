const TelegramBot = require('node-telegram-bot-api');
const users = require('../repo/user-repo');
const constants = require('../config/constants');
const config = require('../config');
// replace the value below with the Telegram token you receive from @BotFather
const token = config.service.tgToken;
const logger = require('../config/logger');
const MongoConnector = require('../db/mongo');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
new MongoConnector(config, logger).connectToMongo();

logger.info("BOT STARTING...");

const getReplyKeyboard = (nextState, isAdmin = false) => {
    let keyboard = [[]];
    switch (nextState) {
        case constants.STATE_NOT_STARTED:
            keyboard = [[{text: constants.COMMAND_START}]];
            break;
        case constants.STATE_NO_SESSION:
            keyboard = [[{text: constants.COMMAND_CREATE_SESSION}, {text: constants.COMMAND_JOIN_SESSION}]];
            console.log(isAdmin);
            if (isAdmin) {
                keyboard.push([{text: constants.COMMAND_SHOW_ADMIN}]);
            }
            break;
        case constants.STATE_IN_SESSION:
            keyboard = [[{text: constants.COMMAND_RESET_SESSION}]];
            break;
        case constants.STATE_WILL_JOIN:
            keyboard = [[{text: constants.COMMAND_RESET_SESSION}]];
            break;
        case constants.STATE_BAD_STATE:
            keyboard = [[{text: constants.COMMAND_CREATE_SESSION}, {text: constants.COMMAND_JOIN_SESSION}, {text: constants.COMMAND_RESET_SESSION}]];
            break;
        case constants.STATE_ADMIN_MAIN:
            keyboard = [
              [{text: constants.COMMAND_ADD_DECKS}],
              [{text: constants.COMMAND_SHOW_DECKS}]
            ];
           break;
        default:
            break;
    }
    return {
        keyboard: keyboard,
        resize_keyboard: false,
        one_time_keyboard: true,
        selective: false,
    }
};
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username;
    const isAdmin = await users.isAdmin(userId);
    try {
        switch (msg.text) {
            case constants.COMMAND_START:
                try {
                    await users.get(userId);
                    await users.resetSession(userId);
                } catch (err) {
                    await users.create(userId, chatId, username);
                }
                bot.sendMessage(chatId, constants.MESSAGE_HELLO, {reply_markup: getReplyKeyboard(constants.STATE_NO_SESSION, isAdmin)});
                break;
            case constants.COMMAND_CREATE_SESSION:
                const sessionId = await users.createSession(userId);
                bot.sendMessage(chatId, `${constants.MESSAGE_SESSION_ID} ${sessionId}. ${constants.MESSAGE_WRITE_BAN}`, {reply_markup: getReplyKeyboard(constants.STATE_IN_SESSION, isAdmin)});
                break;
            case constants.COMMAND_JOIN_SESSION:
                await users.willJoinSession(userId);
                bot.sendMessage(chatId, constants.MESSAGE_ENTER_ID, {reply_markup: getReplyKeyboard(constants.STATE_WILL_JOIN, isAdmin)});
                break;
            case constants.COMMAND_RESET_SESSION:
                await users.resetSession(userId);
                bot.sendMessage(chatId, constants.MESSAGE_RESET_SESSION, {reply_markup: getReplyKeyboard(constants.STATE_NO_SESSION, isAdmin)});
                break;
            case constants.COMMAND_SHOW_ADMIN:
                bot.sendMessage(chatId, constants.MESSAGE_PICK, {reply_markup: getReplyKeyboard(constants.STATE_ADMIN_MAIN, isAdmin)});
                break;
            case constants.COMMAND_ADD_DECKS:
                bot.sendMessage(chatId, constants.MESSAGE_WRITE_DECK_NAME, {reply_markup: getReplyKeyboard(constants.STATE_ADMIN_MAIN, isAdmin)});
                break;

            default:
                const user = await users.get(userId);
                console.log(user);
                switch (user.state) {
                    case constants.STATE_WILL_JOIN:
                        await users.joinSession(userId, msg.text);
                        bot.sendMessage(chatId, `${constants.MESSAGE_YOU_JOINED}. ${constants.MESSAGE_WRITE_BAN}`, {reply_markup: getReplyKeyboard(constants.STATE_IN_SESSION, isAdmin)});
                        break;
                    case constants.STATE_IN_SESSION:
                        const result = await users.addMessageToSession(userId, msg.text);
                        if (result) {
                            await users.resetSession(userId);

                            for (const playerId of [result.player_1_id, result.player_2_id]) {
                                const player = await users.get(playerId);
                                bot.sendMessage(player.chatId, result.message, {reply_markup: getReplyKeyboard(player.state, isAdmin)});
                            }
                        } else {
                            bot.sendMessage(chatId, constants.MESSAGE_RESPONSE_SAVED, {reply_markup: getReplyKeyboard(constants.STATE_IN_SESSION, isAdmin)})
                        }
                        break;
                    default:
                        bot.sendMessage(chatId, constants.MESSAGE_BAD_STATE, {reply_markup: getReplyKeyboard(constants.COMMAND_RESET_SESSION, isAdmin)});
                        break;
                }
                break;
        }
    } catch (err) {
        bot.sendMessage(chatId, err.message);
    }
});
