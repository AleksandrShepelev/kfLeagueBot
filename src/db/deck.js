const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  img: {type: String, required: true},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, background: false});

/*
SessionSchema.index({
  irreversible_block: 1,
  is_confirmed: 1,
  is_cancelled: 1,
});
*/

DeckSchema.pre('save', function (next) {
  this.increment();
  this.updatedAt = new Date().getTime();
  next();
});

module.exports = mongoose.model('Deck', DeckSchema);
