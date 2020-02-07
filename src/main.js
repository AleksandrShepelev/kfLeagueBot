const TelegramBot = require('node-telegram-bot-api');
const users = require('./user-repo');
const constants = require('./constants');
// replace the value below with the Telegram token you receive from @BotFather
const token = "1044282259:AAGONXcJI4EX7wthv7Uuiea9eF1qiUu7VJI";
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


const getReplyKeyboard = (nextState) => {
    let keyboard = [[]];
    switch (nextState) {
        case constants.STATE_NO_SESSION:
            keyboard = [[{text: constants.COMMAND_CREATE_SESSION}, {text: constants.COMMAND_JOIN_SESSION}]];
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
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    try {
        switch (msg.text) {
            case constants.COMMAND_START:
                try {
                    users.get(userId);
                    users.resetSession(userId);
                } catch (err) {
                    users.create(userId, chatId);
                }
                bot.sendMessage(chatId, constants.MESSAGE_HELLO, {reply_markup: getReplyKeyboard(constants.STATE_NO_SESSION)});
                break;
            case constants.COMMAND_CREATE_SESSION:
                const sessionId = users.createSession(userId);
                bot.sendMessage(chatId, `${constants.MESSAGE_SESSION_ID} ${sessionId}. ${constants.MESSAGE_WRITE_BAN}`, {reply_markup: getReplyKeyboard(constants.STATE_IN_SESSION)});
                break;
            case constants.COMMAND_JOIN_SESSION:
                users.willJoinSession(userId);
                bot.sendMessage(chatId, constants.MESSAGE_ENTER_ID, {reply_markup: getReplyKeyboard(constants.STATE_WILL_JOIN)});
                break;
            case constants.COMMAND_RESET_SESSION:
                users.resetSession(userId);
                bot.sendMessage(chatId, constants.MESSAGE_RESET_SESSION, {reply_markup: getReplyKeyboard(constants.STATE_NO_SESSION)});
                break;
            default:
                const user = users.get(userId);
                console.log(user);
                switch (user.state) {
                    case constants.STATE_WILL_JOIN:
                        users.joinSession(userId, msg.text);
                        bot.sendMessage(chatId, `${constants.MESSAGE_YOU_JOINED}. ${constants.MESSAGE_WRITE_BAN}`, {reply_markup: getReplyKeyboard(constants.STATE_IN_SESSION)});
                        break;
                    case constants.STATE_IN_SESSION:
                        const result = users.addMessageToSession(userId, msg.text);
                        if (result) {
                            users.resetSession(userId);

                            for (const playerId of [result.player_1_id, result.player_2_id]) {
                                const player = users.get(playerId);
                                bot.sendMessage(player.chatId, result.message, {reply_markup: getReplyKeyboard(player.state)});
                            }
                        } else {
                            bot.sendMessage(chatId, constants.MESSAGE_RESPONSE_SAVED, {reply_markup: getReplyKeyboard(constants.STATE_IN_SESSION)})
                        }
                        break;
                    default:
                        bot.sendMessage(chatId, constants.MESSAGE_BAD_STATE, {reply_markup: getReplyKeyboard(constants.COMMAND_RESET_SESSION)});
                        break;
                }
                break;
        }
    } catch (err) {
        bot.sendMessage(chatId, err.message);
    }
});
