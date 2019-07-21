const UploadRoute = require('express').Router()
const { checkSchema } = require('express-validator')

const UploadController = require('../controllers/UploadController')
const UploadValidationSchema = require('../middlewares/validation/UploadSchema')

const allowedMethod = require('../middlewares/allowedRequestMethod')
const authentication = require("../middlewares/authentication")
const isRequestBodyEmpty = require('../middlewares/isRequestBodyEmpty')

UploadRoute.use(allowedMethod(["GET", "POST", "OPTIONS"]))
UploadRoute.get("/file/upload", authentication, UploadController.fileUpload)
UploadRoute.post("/file/download", authentication, isRequestBodyEmpty, checkSchema(UploadValidationSchema.onDownload), UploadController.fileDownload)

module.exports = UploadRoute