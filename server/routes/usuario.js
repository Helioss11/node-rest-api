const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const app = express();

app.get('/usuario', async (req, res) => {
  
  let desde = parseInt(req.query.desde) || 0;
  let limite = parseInt(req.query.limite) || 5;

  try {

    let usuarios = await Usuario.find()
    .skip(desde)
    .limit(limite)
    .exec();

    res.json({
      ok: true,
      usuario: usuarios
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      err
    });
  }

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
  let { nombre, img, role, estado } = req.body;
  let body = { nombre, img, role, estado };
  console.log('body', body);

  try {
    
    let usuarioDB = await Usuario.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
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