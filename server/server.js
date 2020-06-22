require('./config/config');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const uri = process.env.URLDB;

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true 
});
mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global routes config
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});