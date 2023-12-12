const express = require('express');
const cors = require('cors');
const routes = require('./router/router')
const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({}))


app.use('/api/v1', routes);

app.use(globalErrorHandler);

module.exports = app;