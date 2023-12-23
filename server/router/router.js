const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const controller = require('../Controller/userController');
const authController = require('../Controller/authController');

const Router = express.Router();

Router.route('/register')
    .post(upload.single('image'), authController.validation, authController.signup);

Router.post('/login', authController.signIn);
Router.get('/logout', authController.signOut)


Router.get('/images/:filename', authController.getImageUrl);

//protected route using jwt verification
Router.get('/getAllUsers', authController.protectRoute, controller.getUsers);
// Router.get('/getAllUsers', controller.getUsers);

Router.get('/getMe', authController.protectRoute, controller.getUser);

Router.get('/*', controller.invalidUrl);

module.exports = Router;