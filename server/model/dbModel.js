const bcrypt = require('bcrypt');
const pool = require('./database');

const saltRounds = 6;

exports.createUser = async (firstname, lastname, username, email, password, callback) => {
    //creating the query in sql syntax
    const query = `
        INSERT INTO user (firstname, lastname, username, email, password)
        VALUES (?, ?, ?, ?, ?)
    `

        //hash password and send every value to the database
        const encryptedPw = await bcrypt.hash(password.toString(), saltRounds)

        //the values for each column in the database
        const values = [firstname, lastname, username, email, encryptedPw];

        pool.query(query, values, (err, result) => {
            if(!err){
                
                callback(err);
                return;
            }
            console.log(result);
            return callback(null, result.insertId)
        })
}


// exports.createUser = async (firstname, lastname, username, email, password) => {
// try {
//     let currentId = pool.length+1;
//     // const {firstname, lastname, username, email, password} = req.body;

//     //hash password and send every value to the database
//     const hashPw = await bcrypt.hash(password.toString(), saltRounds);
//     const values = {firstname: `${firstname}`, lastname: `${lastname}`, username: `${username}`, email: `${email}`, hashPw};
//         // console.log('values: ', values)
//     const newUser = { id: currentId++, ...values };
//     // console.log(newUser);
//     pool.push(newUser);
//    return newUser;
// } catch (error) {
//     console.error(error);
// }
// }

exports.getAllUsers = (callback) => {
    const query = `
        SELECT * FROM user
    `
    pool.query(query, (err, result) => {
        if(err){
            callback(err)
            return;
        }
        callback(result);
    })
    // return callback(pool);
}