const jwt = require('jsonwebtoken');

const verificaToken = async (req, res, next) => {
  let token = req.get('Authorization');
  try {
    let decoded = await jwt.verify(token, process.env.SEED);
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    errorResponse(401, res, 'Invalid token');
  }
};

const validateRole = async (req, res, next) => {

  let usuario = req.usuario;
  if(usuario.role !== 'ADMIN_ROLE'){
    return errorResponse(400, res, 'Invalid user role');
  }

  next();
  
}

const errorResponse = (code, res, error) => {

  res.status(code).json({
    ok: false,
    error
  });

  res.end();

}

module.exports = {
  verificaToken,
  validateRole
}