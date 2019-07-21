const jsonwebtoken = require('jsonwebtoken');

const generateToken = (dataToSign) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(dataToSign, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '7d'
    }, (err, token) => {
      if (err) {
        return reject(err)
      };
      return resolve(token)
    })

  })
}

module.exports = generateToken