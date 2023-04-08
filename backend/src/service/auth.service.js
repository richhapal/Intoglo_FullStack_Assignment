const { UserModel } = require("../model/user.models");
const bcrypt = require("bcryptjs");
class UserService {
     findUserById = async (id) => {
          const userRegistered = await UserModel.findOne({ _id: id });
          return userRegistered;
     };
     findUserByType = async (userType) => {
          const userRegistered = await UserModel.findOne({ userType });
          return userRegistered;
     };

     isEmailAlreadyRegistered = async (email) => {
          const userRegistered = await UserModel.findOne({ email });
          return userRegistered == null ? false : userRegistered;
     };

     save = async function (doc) {
          const result = await doc.save();
          return result;
     };

     createUser = async (data) => {
          const { email, password, userType } = data;
          const isEmailRegistered = await this.isEmailAlreadyRegistered(email);
          // if isEmailRegistered is false then we can say user is not created yet

          //   we have to check user is trying to registered as admin bcz admin can only one

          if (userType === "admin") {
               let isAdminAlreadyRegistered = await this.findUserByType(userType);
               if (isAdminAlreadyRegistered) {
                    return { message: "Admin Is Already Registered Please Registered As User" };
               }
          }

          //   if (userType === "manager") {
          //        let isAdminAlreadyRegistered = await this.findUserByType(userType);
          //        if (isAdminAlreadyRegistered) {
          //             return { message: "Admin Is Already Registered Please Registered As User" };
          //        }
          //   }

          // console.log("isEmail", isEmailRegistered);
          if (!isEmailRegistered) {
               const hashpassword = await bcrypt.hash(password, 10);
               const user = new UserModel({ ...data, password: hashpassword });
               const newUser = await this.save(user);
               return newUser;
          } else {
               return { message: "User is Already Registered with Email" };
          }
     };

     login = async (data) => {
          let findUser = await this.isEmailAlreadyRegistered(data.email);
          if (findUser) {
               let comparePassword = await bcrypt.compare(data.password, findUser.password);
               let result = comparePassword ? findUser : { message: "Invalid Password" };
               return result;
          } else {
               return { message: "User Not Found" };
          }
     };
}

module.exports = UserService;
