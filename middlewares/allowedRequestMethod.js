const httpResponse = require('../libs/httpResponse');

module.exports = (requestMethodArray) => {
  return (req, res, next) => {
    const method = req.method;

    const allowedMethods = requestMethodArray
    const isValidOperation = allowedMethods.includes(method)
    if (!isValidOperation) {
      return res.status(405).json(httpResponse(false, `${req.method} is not Allowed.`, { allowedMethods }))
    }
    next();
  }
}