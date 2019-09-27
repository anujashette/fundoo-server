/******************************************************************************
 *  Purpose:  Store file into memory storage and allowed only image formate data
 *
 *  @file    Multer
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
const multer = require('multer');

 /**
  * @description Multer is worked as body parser to extract form data
  */
var storage = multer.memoryStorage()
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = file.mimetype;
        console.log('extension',ext)
        console.log('ext', ext)
        if(!ext.match(/jpeg|png|jpg$i/)) {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }});

module.exports = upload;

