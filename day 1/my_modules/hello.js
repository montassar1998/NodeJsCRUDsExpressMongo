const hello = function () {
  console.log("Bonjour ");
};
const hellohello = function () {
  console.log("BonjourBonjour ");
};

module.exports = hello;

//this module will recognize this hellohello only
module.exports = hellohello;
