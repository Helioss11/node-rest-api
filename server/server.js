require('./config/config');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 app.get('/usuario', (req, res) => {
   res.json('get Hello world');
 });

 app.post('/usuario', (req, res) => {
  res.json('post Hello world');
});

app.put('/usuario/:id', (req, res) => {
  let id = req.params.id;
  res.json({
    id,
    ...req.body
  });
});

app.delete('/usuario/:id', (req, res) => {
  res.json('delete Hello world');
});

 app.listen(process.env.PORT, () => {
   console.log(`Escuchando en el puerto: ${process.env.PORT}`);
 });