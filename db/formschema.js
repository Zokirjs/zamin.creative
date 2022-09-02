const mongoose = require('mongoose');

const formschema = new mongoose.Schema({
  name: String,
  date: String,
  tell: String,
  yonalish: String,
  file: String,
  rozilik: Boolean,
});

const Form = mongoose.model('Form', formschema);

module.exports = Form;
