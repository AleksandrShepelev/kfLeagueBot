const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  chatId: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  currentSession: { type: String},
  state: { type: String, required: true},
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, background: false });

UserSchema.pre('save', function(next) {
  this.increment();
  this.updatedAt = new Date().getTime();
  next();
});

module.exports = mongoose.model('User', UserSchema);
