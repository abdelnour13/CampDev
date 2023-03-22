// imports

const body_parser = require('body-parser');
const express = require('express');
const http_status = require('http-status');
const path = require('path');
const relations = require('./relations');
const connection = require('./config/sequelize');

const app = express();

// middlewares

app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.json());
app.use(express.urlencoded({ extended:true }));

// to allow all clients with diffrent domain names to use the Api

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // allow diffrent domain names
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,PUT') // allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // allowed headers
    next()
});

// error handler
// all the errors passed to the next function must 
// have the tow proprities status & message

const errorHandler = (err,req,res,next) => {
    console.log(err)
    const status = err.status || http_status.INTERNAL_SERVER_ERROR;
    res.status(status).json({
        message: err.message,
        status: err.status
    });
};

// routers



// use the error handler

app.use(errorHandler);

connection.authenticate()
    .then(() => app.listen(8080, () => console.log('connected')))
    .catch(err => console.log(err));


