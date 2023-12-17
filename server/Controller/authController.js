const pool = require('../model/database');
const database = require('../model/dbModel');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/customError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    const {firstname, lastname, username, email, password} = req.body;

    

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
                    //generate token
                    const id = data[0].id;
                    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_KEY_EXPIRES});

                    //store the token in a cookie variable called 'token'
                    res.cookie(process.env.COOKIE_TOKEN, token);

                    //not displaying password in the response data by destructuring it out
                    const {password, ...userDetails} = data[0];

                    res.status(200).send({
                        message: 'successfully logged in!',
                        data: {
                            result: userDetails
                        },
                        token: token
                    });
                }else{
                    let err = {message: "invalid email or password", name: "password"}
                    next(err);
                    }
            })
            
        }
        //if email does not exists
        else{
            let err = {message: "invalid email or password"};
            next(err);
        }
        
    })
}

exports.protectRoute = (req, res, next) => {
    const token = req.cookies.token;
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err || !token) {
            //if the token has expired || if it is empty
            next(err);
        }else {
            req.id = decoded.id;
            // console.log(decoded);
            next();
        }
    })
}

exports.validation = (req, res, next) => {
    const {password, confirmPassword, email} = req.body;

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email || !emailRegex.test(email)) {
    //   return res.status(400).json({ error: 'Invalid email address' });
        // const message = "Invalid email address";
        let err = {message: "Invalid email address"}
        next(err);
    }
    if(password?.length === 0 && confirmPassword?.length === 0){
        const message = "Password fields cannot be empty!";
        const error = new CustomError(message, 400);
        next(error)
    }
     if(password?.length === 0 && confirmPassword?.length !== 0){
        const message = "Please input password";
        const error = new CustomError(message, 400);
        next(error)
    }
    if (confirmPassword?.length === 0 && password?.length !== 0 ){
        const message = "Please input confirm password";
        const error = new CustomError(message, 400);
        next(error)
    }
    if(((password?.length && confirmPassword?.length) !== 0) && (password !== confirmPassword)){
        const message = "Passwords do not match";
        const error = new CustomError(message, 400);
        next(error);
    }
   
  
    // If the email, password and confirm password is valid, pass control to the next middleware or route handler
    next();
}