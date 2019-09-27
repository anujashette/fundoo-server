// require('dotenv').config()
require('dotenv').config({ path: require('find-config')('.env') })

module.exports={
    'accessKeyID' : process.env.accessKeyID,
'secretAccessKey' : process.env.secretAccessKey,
'aws_region' : process.env.aWS_REGION,
'AWS_Uploaded_File_URL_LINK' : process.env.AWS_Uploaded_File_URL_LINK,
'BucketName' : process.env.BucketName
}

