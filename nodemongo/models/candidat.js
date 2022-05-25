const mongoose = require('mongoose');

const candidat_schema = new mongoose.Schema({
    name : String,
    age : Number,
    class : String
});

//mongodb always adds an S at the end
let candidat = mongoose.model('candidat',candidat_schema);

module.exports.candidat = candidat;