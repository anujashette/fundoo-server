/******************************************************************************
 *  Purpose:  Provide metadata to upload file on s3
 *
 *  @file    S3
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
const AWS = require('aws-sdk');
const config = require('../../config')

const s3Client = new AWS.S3({
    accessKeyId: config.accessKeyID,
    secretAccessKey: config.secretAccessKey,
    region : config.aws_region
});

const uploadParams = {
         Bucket: config.BucketName, 
         Key: '', 
         Body: null, 
         acl:'public-read'
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;