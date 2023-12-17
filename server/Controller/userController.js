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

exports.getUser = (req, res) => {
    const id = req.id;

    console.log(id);
    model.getMe(id, (err, row) => {//NB: the 'err' is not used, but it is mandatory to be there
        // in other for the row array to be displayed

        const {password, ...userDetails} = row[0];

        res.status(200).send({
            message: 'success',
                userDetails
        })
    })
}

exports.invalidUrl = (req, res, next) => {
    const url = req.originalUrl;
    const error = new customError(`${url} is an invalid url`, 400);
    next(error);
}
