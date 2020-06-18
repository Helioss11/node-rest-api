require('./config/config');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const uri = 'mongodb://localhost:27017/cafe';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/usuario'));

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});