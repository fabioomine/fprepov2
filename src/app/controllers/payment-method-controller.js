const express = require('express');
const authMiddleware = require('../middlewares/auth');
const envConfig = require('../../config/env');
const env = require('../../config/env');
const iuguResources = require('iugu').resources;
const iugu = require('iugu')(env.iugu.apiKey); // Ache sua chave API no Painel

const PaymentMethodModel = require('../models/payment-method');

const router = express.Router();

router.use(authMiddleware);

//list
router.get('/', async (req,res)=>{
  try {
    const paymentMethod = await PaymentMethodModel.find();

    return res.send({ paymentMethod });
  } catch( err ) {
    return res.status(400).send({ error: 'Error loading payment method' });
  }
});

//FIND
router.get('/:paymentMethodId', async (req,res)=>{
  try {
    const paymentMethod = await PaymentMethodModel.findById(req.params.paymentMethodId);

    return res.send({ paymentMethod });
  } catch( err ) {
    return res.status(400).send({ error: 'Error loading payment method' });
  }
});

//CREATE
router.post('/', async(req,res)=> {
  try {
    const { paymentMethodToken, customerId, cardName, cardBrand, user } = req.body;

    //VERIFICA SE PAYMENTMETHODTOKEN E CUSTOMERID EXISTEM NA IUGU
    const customer = await iugu.customers.retrievePaymentMethod(customerId,paymentMethodToken);
    if(customer == null ) {
      return res.status(400).send({ error: 'payment method not found' });
    }
    if(customer.customer_id != customerId) {
      return res.status(400).send({ error: 'payment method not found for customer' });
    }

    //VALIDOU NA IUGU, AGORA PODE SALVAR
    const paymentMethod = await PaymentMethodModel.create( { paymentMethodToken, cardName, cardBrand, user });
    await paymentMethod.save();

    return res.send({ paymentMethod });
  } catch(err) {
    console.log(err);
    return res.status(400).send({ error: 'Error creating new payment method' });
  }
});

//UPDATE
router.put('/:paymentMethodId', async (req,res)=>{
  try {
    const { paymentMethodToken, customerId, cardName, cardBrand, user } = req.body;

    //VERIFICA SE PAYMENTMETHODTOKEN E CUSTOMERID EXISTEM NA IUGU
    const customer = await iugu.customers.retrievePaymentMethod(customerId,paymentMethodToken);
    if(customer == null ) {
      return res.status(400).send({ error: 'payment method not found' });
    }
    if(customer.customer_id != customerId) {
      return res.status(400).send({ error: 'payment method not found for customer' });
    }

    //VALIDOU NA IUGU, AGORA PODE SALVAR
    const paymentMethod = await PaymentMethodModel.findByIdAndUpdate( req.params.paymentMethodId, {
      paymentMethodToken, customerId, cardName, cardBrand, user
    }, { new: true });

    await paymentMethod.save();
    return res.send({ paymentMethod });
  } catch(err) {
    console.log(err);
    return res.status(400).send({ error: 'Error updating payment method' });
  }
});

//DELETE
router.delete('/:paymentMethodId', async (req,res)=>{
  try {
    const paymentMethod = await PaymentMethodModel.findByIdAndRemove(req.params.paymentMethodId);
    return res.send();
  } catch( err ) {
    return res.status(400).send({ error: 'Error deleting payment methodId' });
  }

});

module.exports = app => app.use('/paymentMethod',router);
