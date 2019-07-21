const verifyToken = require("../libs/verifyJWTPromise")
const UserModel = require('../models/UserModel')
const httpResponse = require('../libs/httpResponse')

const auth = async (req, res, next) => {
  try {

    let token = req.header('Authorization') || 'false'

    if (token === 'false') throw new Error("JWT Token must be provided.")

    token = token.replace('Bearer ', '')

    const decoded = await verifyToken(token)

    req.user = decoded;

    next()

  } catch (error) {
    const message = error.message || "Failed to authenticated."
    return res.status(401).json(httpResponse(false, message))
  }

}

module.exports = auth