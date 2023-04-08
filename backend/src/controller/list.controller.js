const ListService = require("../service/list.service");
const ListServiceInstance = new ListService();
const httpStatus = require("http-status");

const createNewList = async (req, res) => {
     try {
          const newList = await ListServiceInstance.createList(req.body);
          res.json(newList);
          console.log("newLIst", newList);
          // if (!newList.message) {
          //      res.status(httpStatus.CREATED).json(newList);
          // } else {
          //      res.status(httpStatus.NO_CONTENT).json(newList);
          // }
     } catch (e) {
          res.json(e);
     }
};

const getList = async (req, res) => {
     try {
          const { userType } = req.params;
          console.log("userType", userType, req.body.email);
          const getList = await ListServiceInstance.getList(userType, req.body.email);
          console.log("getLIst", getList);
          res.status(httpStatus.OK).json(getList);
     } catch (e) {
          res.json(e);
     }
};

const updateList = async (req, res) => {
     try {
          const updatedList = await ListServiceInstance.updateList(req.body);

          // console.log("updatedList", updatedList);

          res.json(updatedList);
     } catch (e) {
          res.json(e);
     }
};

module.exports = { createNewList, getList, updateList };
