const pool = require('../model/database');
const database = require('../model/dbModel');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/customError');

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

    database.registerUser(firstname, lastname, username, email, password,  (err, insertId) => {
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
            }
        })
    })
}

exports.signIn = (req, res, next) => {
    const {email, password} = req.body;

    database.logIn(email, password, (err ,data) => {
        
        //check if email exists in database
        if(data?.length > 0 ){
            //if it exists, compare the inputted password and password in database
            bcrypt.compare(password.toString(), data[0].password, (error, same) =>{
                //if password after being compared is the same send data
                if(same){
                    // let userDetails = data[0];
                    const {password, ...userDetails} = data[0];
                    res.status(200).send({
                        message: 'success',
                        data: {
                            result: userDetails
                        }
                    });
                }
                else {
                    //if password after being compareed is !same, send error message and status code
                    const message = "invalid email or password";
                    const Err = new CustomError(message, 404);
                    next(Err);
                }
            })
            
        }
        //if email does not exists
        else{
           const message = "invalid email or password";
            const Err = new CustomError(message, 404);
            next(Err);
        }
        
    })
}