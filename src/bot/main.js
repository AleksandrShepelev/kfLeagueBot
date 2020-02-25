const TelegramBot = require('node-telegram-bot-api');
const users = require('../repo/user-repo');
const decks = require('../repo/deck-repo');
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

const getReplyKeyboard = (options) => {
    let keyboard = [[]];
    switch (options.nextState) {
        case constants.STATE_NOT_STARTED:
            keyboard = [[{text: constants.COMMAND_START}]];
            break;
        case constants.STATE_NO_SESSION:
            keyboard = [
                [
                    {text: constants.COMMAND_CREATE_SESSION},
                    {text: constants.COMMAND_JOIN_SESSION}
                ],
                [
                    {text: constants.COMMAND_SHOW_DECKS}
                ]
            ];
            /*
            if (isAdmin) {
                keyboard.push([{text: constants.COMMAND_SHOW_ADMIN}]);
            }
             */
            break;
        case constants.STATE_IN_SESSION:
            keyboard = [];
            if (options.decks) {
                for (const deck of options.decks)
                    keyboard.push(
                        [{text: deck}]
                    )
            }
            keyboard.push(
                [
                    {text: constants.COMMAND_RESET_SESSION}
                ]
            );
            break;
        case constants.STATE_WILL_JOIN:
            keyboard = [[{text: constants.COMMAND_RESET_SESSION}]];
            break;
        case constants.STATE_BAD_STATE:
            keyboard = [[{text: constants.COMMAND_CREATE_SESSION}, {text: constants.COMMAND_JOIN_SESSION}, {text: constants.COMMAND_RESET_SESSION}]];
            break;
        /*
    case constants.STATE_ADMIN_MAIN:
        keyboard = [
          [{text: constants.COMMAND_ADD_DECKS}],
          [{text: constants.COMMAND_SHOW_DECKS}]
        ];
       break;

         */
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
    //const isAdmin = await users.isAdmin(userId);
    const isAdmin = false;
    try {
        switch (msg.text) {
            case constants.COMMAND_START:
                try {
                    await users.get(userId);
                    await users.resetSession(userId);
                } catch (err) {
                    await users.create(userId, chatId, username);
                }
                bot.sendMessage(chatId, constants.MESSAGE_HELLO, {reply_markup: getReplyKeyboard({nextState: constants.STATE_NO_SESSION})});
                break;
            case constants.COMMAND_CREATE_SESSION:
                const sessionId = await users.createSession(userId);
                const dbDecks = await decks.getList(username);
                const deckNames = dbDecks.map((deck) => deck.name);

                bot.sendMessage(chatId, `${constants.MESSAGE_SESSION_ID} ${sessionId}. ${constants.MESSAGE_CHOOSE_DECKS}`,
                    {
                        reply_markup: getReplyKeyboard(
                            {
                                nextState: constants.STATE_IN_SESSION,
                                decks: deckNames,
                            })
                    });
                break;
            case constants.COMMAND_JOIN_SESSION:
                await users.willJoinSession(userId);
                bot.sendMessage(chatId, constants.MESSAGE_ENTER_ID, {reply_markup: getReplyKeyboard({nextState: constants.STATE_WILL_JOIN})});
                break;
            case constants.COMMAND_RESET_SESSION:
                await users.resetSession(userId);
                bot.sendMessage(chatId, constants.MESSAGE_RESET_SESSION, {reply_markup: getReplyKeyboard({nextState: constants.STATE_NO_SESSION})});
                break;
            case constants.COMMAND_SHOW_DECKS:
                const decksMessage = await decks.getListInTextFormat(username);
                bot.sendMessage(chatId, decksMessage, {reply_markup: getReplyKeyboard({nextState: constants.STATE_NO_SESSION})});
                break;
            /*
            case constants.COMMAND_SHOW_ADMIN:
                bot.sendMessage(chatId, constants.MESSAGE_PICK, {reply_markup: getReplyKeyboard({nextState: constants.STATE_ADMIN_MAIN})});
                break;
            case constants.COMMAND_ADD_DECKS:
                bot.sendMessage(chatId, constants.MESSAGE_WRITE_DECK_NAME, {reply_markup: getReplyKeyboard({nextState: constants.STATE_ADMIN_MAIN})});
                break;
            */
            default:
                const user = await users.get(userId);
                console.log(user);
                switch (user.state) {
                    case constants.STATE_WILL_JOIN:
                        await users.joinSession(userId, msg.text);
                        const dbDecks = await decks.getList(username);
                        const deckNames = dbDecks.map((deck) => deck.name);

                        bot.sendMessage(chatId, `${constants.MESSAGE_YOU_JOINED}. ${constants.MESSAGE_CHOOSE_DECKS}`,
                            {
                                reply_markup: getReplyKeyboard({
                                    nextState: constants.STATE_IN_SESSION,
                                    decks: deckNames
                                })
                            });
                        break;
                    case constants.STATE_IN_SESSION:
                        const state = (await users.getSession(userId)).state;
                        switch (state) {
                            case "pick":
                                const deckAddResult = await users.addDeckToSession(userId, msg.text);
                                if (deckAddResult) {
                                    let msgToPlayer1 = constants.MESSAGE_PICK_BAN;
                                    msgToPlayer1 += "\n";

                                    for (const deck of deckAddResult.player2.decks) {
                                        msgToPlayer1 += deck.name;
                                        msgToPlayer1 += "\n";
                                        msgToPlayer1 += deck.url;
                                        msgToPlayer1 += "\n";
                                        msgToPlayer1 += "\n";
                                    }

                                    let msgToPlayer2 = constants.MESSAGE_PICK_BAN;
                                    msgToPlayer2 += "\n";

                                    for (const deck of deckAddResult.player1.decks) {
                                        msgToPlayer2 += deck.name;
                                        msgToPlayer2 += "\n";
                                        msgToPlayer2 += deck.url;
                                        msgToPlayer2 += "\n";
                                        msgToPlayer2 += "\n";
                                    }

                                    bot.sendMessage(deckAddResult.player1.id,
                                        msgToPlayer1,
                                        {
                                            reply_markup: getReplyKeyboard({
                                                nextState: constants.STATE_IN_SESSION,
                                                decks: deckAddResult.player2.decks.map(deck => deck.name)
                                            })
                                        }
                                    );

                                    bot.sendMessage(deckAddResult.player2.id,
                                        msgToPlayer2,
                                        {
                                            reply_markup: getReplyKeyboard({
                                                nextState: constants.STATE_IN_SESSION,
                                                decks: deckAddResult.player1.decks.map(deck => deck.name)
                                            })
                                        }
                                    )
                                } else {
                                    const player = await users.getSessionPlayerData(userId);

                                    const dbDecks = await decks.getList(username);
                                    const allDecks = dbDecks.map((deck) => deck.name);
                                    const chosenDecks = player.decks.map((deck) => deck.name);
                                    const remainingDecks = (allDecks.filter(name => !chosenDecks.includes(name)));

                                    if (chosenDecks.length < 3) {
                                        bot.sendMessage(userId,
                                            `${constants.MESSAGE_LEFT} ${3-chosenDecks.length}/3`,
                                            {
                                                reply_markup: getReplyKeyboard({
                                                    nextState: constants.STATE_IN_SESSION,
                                                    decks: remainingDecks
                                                })
                                            }
                                        )
                                    } else {
                                        bot.sendMessage(userId,
                                            constants.WAITING_FOR_ANOTHER_PLAYER,
                                            {
                                                reply_markup: getReplyKeyboard({
                                                    nextState: constants.STATE_IN_SESSION,
                                                })
                                            }
                                        )
                                    }
                                }
                                break;
                            case "ban":
                                const result = await users.addMessageToSession(userId, msg.text);
                                if (result) {
                                    await users.resetSession(userId);
                                    for (const playerId of [result.player_1_id, result.player_2_id]) {
                                        const player = await users.get(playerId);
                                        bot.sendMessage(player.chatId, result.message, {reply_markup: getReplyKeyboard({nextState: player.state})});
                                    }
                                } else {
                                    bot.sendMessage(chatId, constants.MESSAGE_RESPONSE_SAVED, {reply_markup: getReplyKeyboard({nextState: constants.STATE_IN_SESSION})})
                                }
                                break;
                        }
                        break;
                    default:
                        bot.sendMessage(chatId, constants.MESSAGE_BAD_STATE, {reply_markup: getReplyKeyboard({nextState: constants.COMMAND_RESET_SESSION})});
                        break;
                }
                break;
        }
    } catch (err) {
        bot.sendMessage(chatId, err.message);
    }
});
