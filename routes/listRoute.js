const express = require("express");
const listRouter = express.Router();
const authentication = require("../middleware/authMiddleware");
const {
  addList,
  removeList,
  getList,
} = require("../controllers/listController");

listRouter.post("/addList/:id", authentication, addList);
listRouter.delete("/removeList/:id", authentication, removeList);
listRouter.get("/getList", authentication, getList);

module.exports = listRouter;
