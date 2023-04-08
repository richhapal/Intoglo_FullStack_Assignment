const { ListModel } = require("../model/list.models");
const { UserModel } = require("../model/user.models");
const moment = require("moment");
class ListService {
     checkListInGivenMonth = async (date, email) => {
          // console.log("checkListInGivenMonth", date, email);
          let findListInGivenMonth = await ListModel.find({ email });
          findListInGivenMonth = findListInGivenMonth.filter((list) => {
               let ListDate = moment(list.date).utc().format("YYYY-MM-DD");
               if (ListDate.split("-")[0] === date.split("-")[0] && ListDate.split("-")[1] === date.split("-")[1]) {
                    return true;
               }
          });
          // console.log("findListInGivenMonth", findListInGivenMonth);
          // return [];
          return findListInGivenMonth;
     };

     createList = async (body) => {
          const { date, email } = body;

          let isList = await this.checkListInGivenMonth(date, email);
          // console.log("list", isList);
          if (isList.length < 3) {
               let createdList = await ListModel.create(body);
               // console.log("createdlist", createdList);
               return createdList;
          }
          return { message: "Cannot add more than 3 reimbursements in a given month" };
     };

     getList = async (userType, email) => {
          // console.log("getList", userType, email);
          let findUserIsRegistered = await UserModel.findOne({ email });

          // return [];
          if (userType === "user" && userType === findUserIsRegistered.userType) {
               return await ListModel.find({ email });
          }
          if (userType === "manager" && userType === findUserIsRegistered.userType) {
               return await ListModel.find({ email, assignTo: userType });
          }
          if (userType === "admin" && userType === findUserIsRegistered.userType) {
               return await ListModel.find({});
          }
          return [];
     };
     updateList = async (data) => {
          // console.log("getList", userType, email);
          const { listId, status, comment } = data;
          let updateList = await ListModel.findOneAndUpdate({ _id: listId }, { $set: { status: status, comment: comment } }, { new: true });
          // console.log("updateList", updateList);
          return updateList;
     };
}

module.exports = ListService;
