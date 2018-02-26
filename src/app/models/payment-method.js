const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const PaymentMethodSchema = new mongoose.Schema({
  paymentMethodToken:{
    type: String,
    unique: true,
  },
  customerId:{
    type: String,
    require: true,
  },
  cardName:{
    type: String,
  },
  cardBrand:{
    type: String,
    enum: ['VISA', 'MASTER', 'AMEX', 'ELO', 'DINERS'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
});

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

module.exports = PaymentMethod;
