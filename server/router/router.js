const express = require('express');
const controller = require('../Controller/userController');
const authController = require('../Controller/authController');

const Router = express.Router();

Router.route('/register')
    .post(authController.signup)

Router.get('/getAllUsers', controller.getUsers)

Router.get('/*', controller.invalidUrl);

module.exports = Router;