/******************************************************************************
 *  Purpose:  Authorization of user using token
 *
 *  @file    Authorization
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
const jwt = require('jsonwebtoken')
const log = require('../logfile/logger')
const path = require('path')
require('dotenv').config({ path: require('find-config')('.env') })

/**
 * @param userToken contains user token
 * isAuthorized returns token is valid or not
 */
exports.isAuthorized = (async function (req,res,next) {
    var response = {
        status: false,
        message: '',
        decoded: '',
    }
    console.log('email verification')
    if(req.params.token){
        var userToken = req.params.token
    }else{
        var userToken = req.headers['token'];
    }
        console.log(userToken)
    try {
        if (!userToken) {
            response.message = 'token is not provided'
            return res.status(401).send(response) 
        }
        else {
           var decoded = await jwt.verify(userToken, process.env.jwtsecret)    // jwtsectrete contains secrete value
                response.status = true
                response.decoded = decoded
        }
        console.log(response.decoded)
        req.token = decoded
        return next()
    }
    catch (err) {
        log.logger.error('Token authorization ', err)
        response.message = 'Token is invalid'
        return res.status(422).send(response)                                                     //  return decoded value
    }
})
