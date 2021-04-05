const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');
const { generarToken } = require('../middleware/auth');

module.exports.login = async (req, res) => {

   // Validacion de campos
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         mensaje: 'Error en la validacion de datos',
         errors: errors.array()
      });
   }

   let { email, password } = req.body;

   // Verificar si el email existe.
   const usuario = await Usuario.findOne({ email });
   if (!usuario) {
      return res.status(404).json({
         mensaje: 'Error. Usuario o contraseña incorrectas',
         statusCode: 404
      });
   }

   // Verificar si las contraseñas encriptadas son iguales o coinciden
   if (!bcrypt.compareSync(password, usuario.password)) {
      return res.status(400).json({
         mensaje: 'Error. Usuario o contraseña incorrectas',
         statusCode: 400
      });
   }

   // Genera token jwt
   let token = generarToken(usuario);

   return res.status(200).json({
      mensaje: 'Login realizado correctamente',
      statusCode: 200,
      token: token
   });
}