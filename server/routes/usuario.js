const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const app = express();

app.get('/usuario', (req, res) => {
  res.json('get Hello world');
});

app.post('/usuario', async (req, res) => {
  
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  try{
    const resp = await usuario.save();
    res.json({
      ok: true,
      usuario: resp
    });
  }catch(err){
    res.status(400).json({
      ok: false,
      err
    });
  }

  res.end();

});
 
app.put('/usuario/:id', async (req, res) => {
  
  let id = req.params.id;
  let body = req.body;

  try {
    
    let usuarioDB = await Usuario.findByIdAndUpdate(id, body);
    res.json({
      ok: true,
      usuario: usuarioDB
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      error
    });
  }

  res.end();
  
});
 
app.delete('/usuario/:id', (req, res) => {
  res.json('delete Hello world');
});

module.exports = app;