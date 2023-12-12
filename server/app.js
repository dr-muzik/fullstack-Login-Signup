const express = require('express');
const cors = require('cors');
const routes = require('./router/router')
const globalErrorHandler = require('./globalError/errorMiddleware');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1', routes);

app.use(globalErrorHandler);

module.exports = app;