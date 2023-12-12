const model = require('../model/dbModel');
const customError = require('../utils/customError');

exports.getUser = (req, res) => {

}

exports.createUser = (req, res) => {

}

exports.updateUser = (req, res) => {

}

exports.invalidUrl = (req, res, next) => {
    const url = req.originalUrl;
    const error = new customError(`${url} is an invalid url`, 404);
    next(error);
}
