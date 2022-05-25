var express = require("express");
const { appendFile } = require("fs");
var router = express.Router();
const { candidat } = require("../models/candidat");
router.use(express.json());
var mongoose = require("mongoose");
var candidatm = require("../models/candidat");
const Joi = require("joi");

router.post("/insert", async function (req, res) {
  let candidate_validation = Joi.object({
    name: Joi.string().min(3).required(),
    class: Joi.string().max(15).required(),
    age: Joi.number().positive().less(100).min(10).required(),
  });
  cnd = new candidat(req.body);
  try {
    const result = candidate_validation.validate(req.body);
    console.log(result);
    if (result.error) {
      res.send("Please respect the form {name,class,age}");
    } else {
      cnd = await cnd.save();

      res.send(cnd);
    }
  } catch (error) {
    res.status(405).send(error.message);
  }
});

router.get("/retrieve", async (req, res) => {
  let cand = await candidat.find();
  res.send(cand);
});
router.get("/retrieve/:name", async (req, res) => {
  //select can be used to project
  let cand = await candidat.find({ name: req.params.name }).select("name -_id");
  if (!cand) return res.status(404).send("candidate not found");
  res.send(cand);
});
router.delete("/deleteCand/:name", async(req,res)=>{
    let candToBeDeleted = await candidat.deleteOne({name: req.params.name })
    if(candToBeDeleted){
        console.log("true and check mongo");
    }else{
        console.log("false and check mongo");
    }
    res.send(candToBeDeleted)
})

module.exports = router;
