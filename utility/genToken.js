const jwt = require('jsonwebtoken')
const log = require('../app/logfile/logger')
const path = require('path')
require('dotenv').config({ path: require('find-config')('.env') })

//  Token is generate and return to 
exports.genToken = async function (userdata) 
{
    // console.log('token generate',userdata)
    const payload = 
    {
        id: userdata.id,
    }
    // console.log('key==>', process.env.jwtsecret)
    try 
    {
        var token = jwt.sign({ payload, }, process.env.jwtsecret,
        {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    }
    catch (err) 
    {
        log.logger.error('Exception in token generation ', err)
    }
}

// let token = genToken({'id':'123',
// 'username':'anuja'})
// console.log('token',token);
