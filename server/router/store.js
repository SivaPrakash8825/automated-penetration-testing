const requestmodel = require("../schema/request");
const { checkConnection } = require("../db/db");
const express = require("express");

const router = express.Router();

checkConnection();

router.post("/getuserrequest", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const result = await requestmodel.find({ userid: userId });
    return res.status(200).send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
