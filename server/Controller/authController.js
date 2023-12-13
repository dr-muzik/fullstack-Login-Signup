const pool = require('../model/database');
const database = require('../model/dbModel');
const catchAsync = require('../utils/catchAsync');

// exports.signup = catchAsync(async (req, res, next) => {
    
//     const {firstname, lastname, username, email, password} = req.body;

//     let array = await database.createUser(firstname, lastname, username, email, password);

//     res.status(201).send({
//         message: 'success',
//         data: {
//            array
//         }
//     })

    
// })


exports.signup = (req, res, next) => {
    const {firstname, lastname, username, email, password } = req.body;

    database.createUser(firstname, lastname, username, email, password,  (err, insertId) => {
        if(err){
            return next(err);
        }
        res.status(201).send({
            message: 'success',
            data: {
               id: insertId,
            firstname,
            lastname,
            username,
            email,
            password
            }
        })
        // res.status(201).send({
        //     message: 'success',
        //     data: {
        //         result
        //     }
        // })
    })
}

exports.login = (req, res) => {
    
}