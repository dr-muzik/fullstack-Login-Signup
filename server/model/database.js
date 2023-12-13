const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB
})


//array database
// let pool = [
//     {
//         id: 1,
//         firstname: 'Wisdom',
//         lastname: 'peters',
//         username: 'wizzy',
//         email: 'drmuzik@gmail.com',
//         password: '12345'
//     }
// ]




module.exports = pool;