const AWS = require('aws-sdk')
const fs = require('fs')
const { promisify } = require('util')

const Help = require('../presenters/upload')

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const s3 = new AWS.S3()

/**
 * @function
 * @param base64
 * @param filename
 * @returns {Promise<ManagedUpload.SendData>}
 * @constructor
 */
const UploadS3 = (base64, filename) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Body: base64,
    Key: filename,
    ACL: 'public-read',
    ContentEncoding: 'base64'
  }
  return s3.upload(params).promise()
}

/**
 * @function
 * @param avatar
 * @returns {Request<S3.DeleteObjectsOutput, AWSError>}
 */
exports.uploadAwsRemove = avatar => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Delete: { Objects: [{ Key: avatar }] }
  }
  return s3.deleteObjects(params)
}

/**
 * @function
 * @param object
 * @returns {Promise<ManagedUpload.SendData>}
 */
exports.uploadAws = async ({ path, bucketFolder = 'image', filename }) => {
  const readFileAsync = promisify(fs.readFile)
  const data = await readFileAsync(path)
  const upload = await UploadS3(data, `${bucketFolder}/${filename}`)
  await Help.uploadRemove(filename)
  return upload
}