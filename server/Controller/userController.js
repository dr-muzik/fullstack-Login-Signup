const model = require('../model/dbModel');
const customError = require('../utils/customError');

exports.getUsers = (req, res, next) => {
    model.getAllUsers((result) => {
        // if(err){
        //     next(err);
        //     return
        // }
        res.status(200).send({
            message: "success",
            data: {
                result
            }
        })
    })
}

exports.createUser = (req, res) => {

}

exports.updateUser = (req, res) => {

}

exports.invalidUrl = (req, res, next) => {
    const url = req.originalUrl;
    const error = new customError(`${url} is an invalid url`, 400);
    next(error);
}
