const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { tokenTypes } = require("./token");
// const { User } = require("../models");

const jwtOptions = {
     secretOrKey: config.jwt.secret,
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
     if (payload.type != tokenTypes.ACCESS) {
          return done(Error("Invalid token type"));
     } else {
          User.findOne({ _id: payload.sub }, (err, user, info) => {
               if (err) {
                    done(err, false, false);
               }
               if (user) {
                    return done(null, user, false);
               } else {
                    return done(null, false, false);
               }
          });
     }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
     jwtStrategy,
};
