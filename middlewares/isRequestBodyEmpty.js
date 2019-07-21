const httpResponse = require('../libs/httpResponse');

module.exports = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json(httpResponse(false, "Unable to process empty data.", req.body))
  }
  next();
}