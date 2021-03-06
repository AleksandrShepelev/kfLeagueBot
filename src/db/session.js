const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new mongoose.Schema({
    id: {type: String},
    ban: {type: String},
    decks: [{
        name: {type: String},
        url: {type: String},
        _id: false,
    }],
    _id: false,
});
const SessionSchema = new Schema({
    id: {type: String, required: true, unique: true},
    player1: Player,
    player2: Player,
    state: {type: String},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, background: false});

/*
SessionSchema.index({
  irreversible_block: 1,
  is_confirmed: 1,
  is_cancelled: 1,
});
*/

SessionSchema.pre('save', function (next) {
    this.increment();
    this.updatedAt = new Date().getTime();
    next();
});

module.exports = mongoose.model('Session', SessionSchema);
