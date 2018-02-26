const express = require('express');
const authMiddleware = require('../middlewares/auth');
const envConfig = require('../../config/env');

const UserPhone = require('../models/user-phone');

const router = express.Router();

router.use(authMiddleware);

//list
router.get('/', async (req,res)=>{
  try {
    const userPhone = await UserPhone.find();

    return res.send({ userPhone });
  } catch( err ) {
    return res.status(400).send({ error: 'Error loading phones' });
  }
});


//FIND
router.get('/:userPhoneId', async (req,res)=>{
  try {
    const userPhone = await UserPhone.findById(req.params.userPhoneId);

    return res.send({ userPhone });
  } catch( err ) {
    return res.status(400).send({ error: 'Error loading user Phone' });
  }
});

//CREATE
router.post('/', async(req,res)=> {
  try {
    const { phoneNumber, user } = req.body;

    const userPhone = await UserPhone.create( { phoneNumber, user });

    await userPhone.save();

    return res.send({ userPhone });
  } catch(err) {
    return res.status(400).send({ error: 'Error creating new user phone' });
  }
});

//UPDATE
router.put('/:userPhoneId', async (req,res)=>{
  try {
    const { phoneNumber, user } = req.body;
    const userPhone = await UserPhone.findByIdAndUpdate( req.params.userPhoneId, {
      phoneNumber, user
    }, { new: true });
    await userPhone.save();

    return res.send({ userPhone });
  } catch(err) {
    console.log(err);
    return res.status(400).send({ error: 'Error updating user phone' });
  }
});

//DELETE
router.delete('/:userPhoneId', async (req,res)=>{
  try {
    const userPhone = await UserPhone.findByIdAndRemove(req.params.userPhoneId);
    return res.send();
  } catch( err ) {
    return res.status(400).send({ error: 'Error deleting user phone' });
  }

});

module.exports = app => app.use('/userPhone',router);
