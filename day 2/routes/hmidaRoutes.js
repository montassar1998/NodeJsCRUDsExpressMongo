var express = require("express");
var router = express.Router();
const Joi = require("joi");

let students = [
  { id: 1, name: "student1", class: "class1", age: 22, address: "Tunis" },
  { id: 2, name: "student2", class: "class1", age: 21, address: "Ariana" },
  { id: 3, name: "student3", class: "class2", age: 18, address: "Tunis" },
  { id: 4, name: "student4", class: "class2", age: 19, address: "Ariana" },
];
// Define validation schema
let student_validation = Joi.object({
  id: Joi.number().positive(),
  name: Joi.string().min(3).required(),
  class: Joi.string().max(15),
  age: Joi.number().integer().positive(),
  address: Joi.required(),
});
// get withspecific middleware
router.get(
  "/hmidaget",
  (req, res, next) => {
    console.log("Get middleware");
    next();
  },
  function (req, res) {
    res.send(students);
  }
);
router.get("/hmidaget/:id", function (req, res) {
  let student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student ID not found");
  res.send(student);
});

router.post("/hmidapost", function (req, res) {
  console.log("here");
  let result_valid = student_validation.validate(req.body);
  if (result_valid.error) return res.status(400).send(result_valid.error);
  let student = {
    id: students.length + 1,
    age: Number(req.body.age),
    name: req.body.name,
    address: req.body.address,
    class: req.body.class,
  };
  students.push(student);
  res.send(student);
});
router.put("/hmidaput/:id", function (req, res) {
  let student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student ID not found");
  student.name = req.body.name;
  res.send(student);
});
router.delete("/hmidadelete/:id", function (req, res) {
  let student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Student ID not found");
  students = students.filter((s) => s.id !== parseInt(req.params.id));
  res.send(student);
});

router.get("/avg", function (req, res) {
  let age = Object.keys(students).reduce(function (prev, key) {
    return prev + students[key].age / students.length;
  }, 0);
  res.send(age.toString());
});

//get candidates who live in the city of :address
router.get("/students/by_address/:address", function (req, res) {
  res.send(students.filter((e) => e.address.toLowerCase() == "ariana"));

  return;
});

router.put("/hmidaputJoi", function (req, res) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    //id: Joi.number().required(),
    address: Joi.string()
      .insensitive()
      .valid("Ariana", "Tunis", "Ben Arous", "Mannouba")

      .required(),
    age: Joi.number().greater(1).less(120).required(),
    class: Joi.string().required(),
    id: Joi.string(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send("Invalid structure");
  } else {
    let ind = students.findIndex((e) => e.id == req.body.id);
    if (ind != -1) {
      students[ind] = req.body;
      res.status(201).send("success " + typeof JSON.stringify(req.body));
    }
    res.status(200).send("resource does not exist please POST it");
  }
});

module.exports = router;
