const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const multer = require('multer');
const Form = require('./db/formschema.js');
mongoose.connect(process.env.MONGO_URI, null, (res) => {
  console.log('conntected');
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString().replace(file.originalname));
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  '/post/form',
  multer({ storage: fileStorage }).single('file'),
  async (req, res) => {
    const newForm = new Form({
      name: req.body.name,
      date: req.body.date,
      tell: req.body.tell,
      rozilik: req.body.rozilik,
      yonalish: req.body.yonalish,
      file: req.file.filename,
    });

    await newForm.save();

    res.send('OK saved');
  }
);

app.get('/get/form', async (req, res) => {
  const data = await Form.find();
  res.send(data);
});

app.listen(PORT, console.log('server is running at ' + PORT));
