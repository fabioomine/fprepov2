const mongoose = require('../../database');

const UserPhoneSchema = new mongoose.Schema({
  phoneNumber:{
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
    unique: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
});

const UserPhone = mongoose.model('UserPhone', UserPhoneSchema);

module.exports = UserPhone;
