const httpResponse = require("../libs/httpResponse")
consoleLogger = require('./consoleLogger')

module.exports = (err, req, res, next) => {


  const statusCode = err.statusCode || 500
  const isSuccess = false
  const message = err.message || "Internal server error."
  const data = err.data || null

  consoleLogger("error", err, "serverErrorHandling", "serverErrorHandling")

  return res.status(statusCode).json(httpResponse(isSuccess, message, data))
}