const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { verificaToken, validateRole } = require('../middlewares/auth');

const app = express();

app.get('/usuario', verificaToken, async (req, res) => {
  
  let desde = parseInt(req.query.desde) || 0;
  let limite = parseInt(req.query.limite) || 5;
  let estado = req.query.hasOwnProperty('estado') ? 
  req.query.estado == 'true' : true;

  try {

    let usuarios = await Usuario.find({estado}, 'nombre img role estado')
    .skip(desde)
    .limit(limite)
    .exec();

    let conteo = await Usuario.count({estado});

    res.json({
      ok: true,
      usuario: usuarios,
      cuantos: conteo
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      error
    });
  }

});

app.post('/usuario', [verificaToken, validateRole], async (req, res) => {
  
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
  }catch(error){
    res.status(400).json({
      ok: false,
      error
    });
  }

  res.end();

});
 
app.put('/usuario/:id', [verificaToken, validateRole], async (req, res) => {
  
  let id = req.params.id;
  let { nombre, img, role, estado } = req.body;
  let body = { nombre, img, role, estado };

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

app.delete('/usuario/:id', [verificaToken, validateRole], async (req, res) => {

  let id = req.params.id;

  try {
    let usuarioBorrado = await Usuario.findByIdAndUpdate(
      id, 
      { estado: false },
      { new: true, }
    );
    if(!usuarioBorrado){
      res.status(400).json({
        ok: false,
        error: {
          message: 'Usuario no encontrado'
        }
      });
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error
    });
  }

});
 
app.delete('/usuario/:id', (req, res) => {
  res.json('delete Hello world');
});

module.exports = app;