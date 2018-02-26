const mongoose = require('../../database');

const UserIdentitySchema = new mongoose.Schema({
  cpf:{
    type: String,
    unique: true,
  },
  rg:{
    type: String,
  },
  name:{
    type: String,
  },
  birth:{
    type: Date,
  },
  photo: {
    data: Buffer,
    contentType: String,
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

const UserIdentity = mongoose.model('UserIdentity', UserIdentitySchema);

module.exports = UserIdentity;
