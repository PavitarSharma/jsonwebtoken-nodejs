const JWT = require("jsonwebtoken");
const createError = require("http-errors")

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: userId,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "jsonwebtoken",
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
          // reject(err);
        }
        resolve(token);
      });
    });
  },
};
