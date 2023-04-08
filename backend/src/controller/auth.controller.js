const UserService = require("../service/auth.service");
const TokenService = require("../service/token.service");
const UserServiceInstance = new UserService();
const TokenServiceInstance = new TokenService();
const createNewUser = async (req, res) => {
     try {
          const newUser = await UserServiceInstance.createUser(req.body);

          //   console.log("newUser", newUser.id);

          if (newUser.id) {
               //    console.log("if", newUser);
               const tokens = await TokenServiceInstance.generateToken(newUser.id, process.env.JWT_ACCESS);
               //    console.log("if", token);
               res.json({ newUser, tokens });
          } else {
               newUser.isLoggedIn = false;
               //    console.log("else", newUser);
               res.json(newUser);
          }
     } catch (e) {
          res.json(e);
     }
};

const userLoginWithEmailAndPassword = async (req, res) => {
     try {
          const loginUser = await UserServiceInstance.login(req.body);
          if (loginUser.id) {
               const tokens = await TokenServiceInstance.generateToken(loginUser._id, process.env.JWT_REFRESH);
               console.log("loginToken", tokens);
               loginUser.isLoggedIn = true;
               res.json({ loginUser, tokens });
          } else {
               loginUser["isLoggedIn"] = false;
               res.json(loginUser);
          }
     } catch (error) {
          res.json(error);
     }
};

module.exports = { createNewUser, userLoginWithEmailAndPassword };
