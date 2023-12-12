const express = require('express');
const controller = require('../Controller/userController');

const Router = express.Router();

Router.route('/')
    .get()
    .post()

    Router.get('/*', controller.invalidUrl);

module.exports = Router;