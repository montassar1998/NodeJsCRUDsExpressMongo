const express = require("express");
//install an npm package from npm
const dtHmidaModule = require("./node_modules/empty_arr_test");
console.log("test " + dtHmidaModule([]));
const hey = require("./my_modules/hello");
const app = express();
const bye = require("./my_modules/aurevoir");
const port = 3000;
const fs = require("fs");
var _ = require("lodash");
app.get("/e", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//http client
var http = require("http");

http
  .createServer(function (req, res) {
    if (req.url == "/") {
      console.log(_.isEqualWith("4", 4));
      res.writeHead(200, { "content-type": "text/html" });
      //console.log("module op " + t.add(5, 6));
      hey();

      bye.waitAminute();
      bye.goodBye();
      res.end("Hello am node js runtime");

      //exercice 1
      const tab = [1, 3, 6, 8, 9];

      var element = 5;
      if (tab.indexOf(element) != -1) {
        console.log("there ");
      } else {
        console.log("not there");
      }

      //exercice 2
      var ch = "ab";
      var stru = "abbbaaaabaaabbc";
      console.log(stru.split(ch));
      console.log(
        ch + " has " + stru.split(ch).length - 1 + " occurence in " + stru
      );
      console.log("Yes", req.url);

      //exercice 3
      var tableau = ["ab", "ba", "abba"];
      var str2 = "abbbaaaabaaabb";
      var result = 0;
      for (const key in tableau) {
        result += str2.split(tableau[key]).length - 1;
      }
      console.log(result);

      //exercice 3 alt 2
      var tableau = ["ab", "ba", "abba"];
      var str2 = "abbbaaaabaaabb";
      var result = 0;
      tableau = tableau
        .map((e) => (e = str2.split(e).length - 1))
        .reduce((prev, curr) => prev + curr);
      console.log("le tableau alternative  2 : ", tableau);

      //exercice 3 alt 3
      const regexp = /(a[b]{1})|(b[a]{1})/g;
      const array = [...str2.matchAll(regexp)];
      console.log("arr 0 ", array);
    }
  })
  .listen(9999);

console.log("version bloquante");
var buffer = fs.readFileSync("myfile.txt");
console.log(buffer);
console.log("faire autre traitement ");
console.log("-------------------------");
console.log("version non bloquante");
fs.readFile("myfile.txt", function (err, buffer_in_param) {
  console.log(buffer_in_param);
});
console.log("faire autre traitement ");
console.log("-------------------------");
const ngm = require("ngmodel")
console.log(ngm());