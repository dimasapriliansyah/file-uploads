const jsonwebtoken = require('jsonwebtoken');

const verifyToken = (tokenToVerify) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(tokenToVerify, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return reject(err)
      };
      return resolve(decoded)
    })
  })
}

module.exports = verifyToken