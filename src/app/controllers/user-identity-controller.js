const express = require('express');
const authMiddleware = require('../middlewares/auth');
const envConfig = require('../../config/env');

const UserIdentity = require('../models/user-identity');

const router = express.Router();

router.use(authMiddleware);

//list
router.get('/', async (req,res)=>{
  try {
    const userIdentity = await UserIdentity.find();

    return res.send({ userIdentity });
  } catch( err ) {
    return res.status(400).send({ error: 'Error loading indeintities' });
  }
});


//FIND
router.get('/:userIdentityId', async (req,res)=>{
  try {
    const userIdentity = await UserIdentity.findById(req.params.userIdentityId);

    return res.send({ userIdentity });
  } catch( err ) {
    return res.status(400).send({ error: 'Error loading userIdentity' });
  }
});

//CREATE
router.post('/', async(req,res)=> {
  try {
    const { cpf, rg, name, birth, photo, user } = req.body;
    console.log('before useridentity.create');
    const userIdentity = await UserIdentity.create( { cpf, rg, name, birth, photo, user });
    console.log('before useridentity.save');
    await userIdentity.save();

    return res.send({ userIdentity });
  } catch(err) {
    console.log(err);
    return res.status(400).send({ error: 'Error creating new identity' });
  }
});

//UPDATE
router.put('/:userIdentityId', async (req,res)=>{
  try {
    const { cpf, rg, user } = req.body;
    const userIdentity = await UserIdentity.findByIdAndUpdate( req.params.userIdentityId, {
      cpf, rg, user
    }, { new: true });
    await userIdentity.save();
    return res.send({ userIdentity });
  } catch(err) {
    return res.status(400).send({ error: 'Error updating identity' });
  }
});

//DELETE
router.delete('/:userIdentityId', async (req,res)=>{
  try {
    const userIdentity = await UserIdentity.findByIdAndRemove(req.params.userIdentityId);
    return res.send();
  } catch( err ) {
    return res.status(400).send({ error: 'Error deleting userIdentity' });
  }

});

module.exports = app => app.use('/userIdentity',router);
