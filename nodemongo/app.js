var mongoose = require("mongoose");
var express = require("express");
let candidat = require("./models/candidat.js");
var insertCand = require("./routes/candidat.js");
const app = express();
app.use("/cands", insertCand);
const PORT = process.env.PORT || 9999;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
mongoose
  .connect(
    "mongodb+srv://montassar:Devops@cluster0.ctbtu.mongodb.net/Candi?retryWrites=true&w=majority"
  )
  .then(() => console.log("Mongodb is Up and hosted in GCP !"))
  .catch((err) => console.log("Mongodb is down, reason : ", err));
var connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
connection.once("disconnected", function () {
  console.log("database is disconnected successfully");
});
