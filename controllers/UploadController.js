const { validationResult } = require('express-validator')
const minioClient = require('../connection/minio');
const uuidv4 = require('uuid/v4');
const httpResponse = require("../libs/httpResponse");
const consoleLogger = require('../libs/consoleLogger');

const fileUpload = async (req, res, next) => {
  try {

    const uuid = uuidv4();
    const uploadedFileName = req.query.name;
    const generatedFileName = uuid + "_" + uploadedFileName

    const bucketName = req.user.bucket;

    // Presigned URL will be expired in 15 minutes.
    const presignedURLExpiresIn = 15 * 60

    // Check if bucket exists.
    const ifBucketExist = await minioClient.bucketExists(bucketName);

    // Make bucket if not exists.
    if (!ifBucketExist) {
      await minioClient.makeBucket(bucketName);
    }

    const presignedURLToUpload = await minioClient.presignedPutObject(bucketName, generatedFileName, presignedURLExpiresIn)

    return res.status(200).json(httpResponse(true, "presigned url created.", { url: presignedURLToUpload, filename: generatedFileName, expiresIn: presignedURLExpiresIn }))

  } catch (error) {
    consoleLogger("error", error, "UploadController", "fileUpload");
    return res.status(422).json(httpResponse(false, "error to create presigned url", null))
  }

}

const fileDownload = async (req, res, next) => {
  try {

    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      return res.status(422).json(httpResponse(false, "Unable to process data.", validationError.array()))
    }

    const bucket = req.user.bucket;
    const fileName = req.body.filename;

    // Presigned URL will be expired in 1 day.
    const presignedURLExpiresIn = 24 * 60 * 60

    const presignedURL = await minioClient.presignedGetObject(bucket, fileName, presignedURLExpiresIn)

    res.json(httpResponse(true, "OK", { url: presignedURL, expiresIn: '1d' }))
  } catch (error) {
    consoleLogger("error", error, "UploadController", "fileDownload");
    return res.status(422).json(httpResponse(false, "error to get download presigned url", { filename: fileName }))
  }

}

module.exports = { fileUpload, fileDownload }