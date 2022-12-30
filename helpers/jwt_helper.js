const JWT = require("jsonwebtoken");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: userId,
      };
      const secret = "some super secret";
      const options = {
        expiresIn: "1h",
        issuer: "jsonwebtoken",
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};
