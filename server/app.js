const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./router/router')
const globalErrorHandler = require('./globalError/errorMiddleware');
const app = express();


app.use(express.json());
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     methods: ["POST, GET"],
//     credentials: true
// }));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1', routes);

app.use(globalErrorHandler);

module.exports = app;