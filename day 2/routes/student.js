var express = require("express");
var router = express.Router();
router.get("/", function (req, res) {
  res.send("In home mr student");
});
router.get("/:name", function (req, res) {
  res.send("In home mr student " + req.params.name + " Welcome back ! ");
});
module.exports = router;
