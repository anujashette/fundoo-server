/******************************************************************************
 *  Compilation:  nodemon server.js
 *  Execution:    nodemon server.js 
 *  
 *  Purpose:  Server is created to connect with frontend and getting/sending 
 *            request/response to user.
 *
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/

 /*
  * Importing all required packages
  */
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/router/router.js");
var expressValidator = require("express-validator");
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../server/Swagger/swagger.json')
var app = express();
const mongoose = require('./app/mongoose/mongoose.connect')
const cors = require('cors')
var schedule = require('node-schedule');
const notify = require('./worker')
 redis = require('redis')
require('dotenv').config()

 /*
  * Body Parser is used to extract the entire body portion 
  * of an incoming request stream.
  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerDocument))
/**
 * Express validator validate request body used throughout application
 */
app.use(expressValidator());
app.use(cors())
app.use('/',routes)

/**
 * Redis client is created to store data in cache
 */
 client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});

/**
 * Event on method get confirmation of connection established with redis
 */
client.on("connect", function (res) {
    console.log("Connection established with redis");
});

/**
 * @description Scheduler for notification service
 */
var j = schedule.scheduleJob('0 58 19 * * ?', ()=>{
  notify();
});

/**
 * Listen method create listener on specific port
 */
var server = app.listen(process.env.port, function () {
    console.log("app running on port.",process.env.port);
});

/**
 * Exporting app for testing API's
 */
module.exports = app; 