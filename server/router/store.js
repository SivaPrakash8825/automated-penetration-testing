const requestmodel = require("../schema/request");
const express = require("express");

const router = express.Router();


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

router.get("/:urlId", async (req, res) => {
  const { urlId } = req.params;
  console.log(urlId);
  try {
    const result = await requestmodel.findOne({ urlId: urlId });
    return res.status(200).send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
