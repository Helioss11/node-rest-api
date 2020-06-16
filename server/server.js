require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
  if(err) throw err;
  console.log('Conectado a mongo');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/usuario'));

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});