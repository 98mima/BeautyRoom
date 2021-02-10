const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/users', userController.getUsers);

router.get('/getAllRegularUsers', userController.getAllRegularUsers);

router.get('/findById/:userId', userController.getUserById);

router.get('/find/:userEmail', userController.findByEmail)

router.put('/edit', userController.updateUser);

router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;