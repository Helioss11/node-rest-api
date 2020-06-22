const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', async (req, res) => {

  let { email, password } = req.body;

  try {

    let usuarioDB = await Usuario.findOne({email});

    if(!usuarioDB){
      return errorResponse(res, 'Usuario y/o contraseña incorrectos');
    }

    if(!bcrypt.compareSync(password, usuarioDB.password)){
      return errorResponse(res, 'Contraseñas no son correctas')
    }

    let token = jwt.sign({
      usuario: usuarioDB
    }, process.env.SEED, {
      expiresIn: process.env.TOKEN_EXPIRES
    });

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });

  } catch (error) {
    return errorResponse(res, error);
  }

});

const errorResponse = (res, error) => {

  res.status(400).json({
    ok: false,
    error
  });

  res.end();

}

module.exports = app;