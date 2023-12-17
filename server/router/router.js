const express = require('express');
const controller = require('../Controller/userController');
const authController = require('../Controller/authController');

const Router = express.Router();

Router.route('/register')
    .post(authController.validation, authController.signup);

Router.post('/login', authController.signIn);

//protected route using jwt verification
Router.get('/getAllUsers', authController.protectRoute, controller.getUsers);

Router.get('/getMe', authController.protectRoute, controller.getUser);

Router.get('/*', controller.invalidUrl);

module.exports = Router;