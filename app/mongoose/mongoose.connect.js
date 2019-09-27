/******************************************************************************
 *  Purpose:  Mongoose services connect to database.
 *
 *  @file    Mongoose.connect.js
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
require('dotenv').config()
const mongoose = require('mongoose')

 mongoose.connect(process.env.mongourl,{
        useNewUrlParser: true,
        useFindAndModify:false,
        useCreateIndex:true
    });
 
mongoose.connection.on('connected', () => {
  console.log('Successfully connected to the database');
});
mongoose.connection.on('error',()=>{
    console.log('Could not connect to the database. Exiting now...', err);
})
mongoose.connection.on('disconnected', () => {
  console.log('connection disconnected');
});