const Jwt = require("jsonwebtoken");
const config = require("../helper/config");
class TokenService {
     generateToken = async (id, type) => {
          const token = await Jwt.sign({ id, type }, config.jwt.secret, { expiresIn: config.jwt.accessExpirationMinutes * 60 });
          const expires = new Date(Date.now() + config.jwt.accessExpirationMinutes * 60 * 1000).toLocaleTimeString();
          // console.log("token", token);
          return { token, expires };
     };
     verifyToken = async (token) => {
          try {
               const verify = await Jwt.verify(token, config.jwt.secret);
               return verify;
          } catch (error) {
               if (error.name == "TokenExpiredError") {
                    return { message: "Please Login Again Session Expired " };
               }
          }
     };
}

module.exports = TokenService;
