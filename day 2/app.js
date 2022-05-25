var express = require("express");
const { join } = require("path");
const router = express.Router();
const morgan = require("morgan");
const config = require("config");

console.log(" app name from config file " + config.get("app_name"));
var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.set("env", "production");
if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  console.log("Using morgan in a dev env format " + app.get("env"));
} else {
  app.use(morgan("dev"));
  console.log("Using morgan in a prod env format " + app.get("env"));
}
// $env: NAME = 'VALUE' || how to export env varables in powershell

console.log("the Database passwor is ", config.get("db.password"));

//app.use(morgan('Dev'))
app.get("/", function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + "/response.html");
});
const appDebugger = require("debug")("app:startup");
const logDebugger = require("debug")("app:log");
app.post("/", function (req, res) {
  res.send("<b>Bonjour Bonjour</b>");
});

var quotes = {
  mouadh: "فلنسرع اليوم لنستمتع بالحياة. من يدري إذا كنا سنكون غدا؟ ",
  dompo8t: "il pleut chnouwa",
  anis: "hello am ani",
};
logDebugger("Logdebugger works : sent from log debugger");
appDebugger("Authentication : sent from debugger app start");

app.get(`/quotes/:name`, function (req, res) {
  res.set({ "content-type": "application/json; charset=utf-8" });

  res.end(quotes[req.params.name]);
});

app.get(`/:name`, function (req, res) {
  res.end(`Hello ${req.params.name}`);
});

app.get("api/studentss", (req, res) => {
  res.send(course);
  console.log(students);
});
app.post("api/studentss", (req, res) => {
  console.log("took it ");
  //   if (!req.body.name || req.body.name.length < 3) {
  //     //400 Bad request
  //    return res.send("Name is required and must have at least 3 characters");
  //   }
  //     const course = {
  //     id: students.length + 1,
  //     nom: req.body.name,
  //   };
  //   students.push(course);
  //   res.send(course);
  //   console.log(students);
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  res.status(201).send(`Ok ${req.body.name}`);
});
app.get("api/studentss/:id", (req, res) => {
  const student = students.find((e) => e.id == parseInt(req.params.id));
  if (!student) {
    res
      .status(404)
      .send(`the student given the id ${req.params.id} does not exist ! `);
  } else {
    res.send(student);
  }
});

app.post("/test/body", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.put("/api/student/:id", (req, res) => {
  var st = req.body;
  var head = req.params.id;
  var result = students.findIndex((e) => {
    head = Number(head);
    return head == e.id;
  });
  if (result != -1) {
    console.log("it matches");
    if (typeof st.name != undefined && typeof st.id != undefined) {
      st.id = head;
      students[result] = st;
      res.status(201).send(students);
    }
  } else {
    console.log("abcd");
    res.status(404).send("Not found");
  }
});

/* crud */
let hmidaStudent = [
  { id: 1, name: "student1" },
  { id: 2, name: "student2" },
  { id: 3, name: "student3" },
];

// app.get("/api/hmidaStudent", function (req, res) {
//   res.send(hmidaStudent);
// });

// app.get("/api/hmidaStudent/:id", function (req, res) {
//   let student = hmidaStudent.find((s) => s.id === parseInt(req.params.id));
//   if (!student) return res.status(404).send("Student ID not found");
//   res.send(student);
// });

// app.post("/api/hmidaStudent", function (req, res) {
//   let student = {
//     id: hmidaStudent.length + 1,
//     name: req.body.name,
//   };
//   hmidaStudent.push(student);
//   res.send(student);
// });

// app.put("/api/hmidaStudent/:id", function (req, res) {
//   let student = hmidaStudent.find((s) => s.id === parseInt(req.params.id));
//   if (!student) return res.status(404).send("Student ID not found");
//   student.name = req.body.name;
//   res.send(hmidaStudent);
// });

// app.delete("/api/hmidaStudent/:id", function (req, res) {
//   let student = hmidaStudent.find((s) => s.id === parseInt(req.params.id));
//   if (!student) return res.status(404).send("Student ID not found");
//   hmidaStudent = hmidaStudent.filter((s) => s.id !== parseInt(req.params.id));
//   res.send(student);
// });
const PORT = process.env.PORT || 9999;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
var hmidaRoute = require("./routes/hmidaRoutes.js");
app.use("/api/v2/", hmidaRoute);

var studentSpace = require("./routes/student.js");
app.use("/student", studentSpace);

