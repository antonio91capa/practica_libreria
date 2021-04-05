const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Usuario = require("../models/usuario");

/**      Obtener un usuario de la base de datos     */
module.exports.getUsuario = async (req, res) => {
   let userId = req.params.id;

   // Validar el parametro id sea correcta
   if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
         mensaje: 'El parametro id es incorrecto',
         status: 400
      });
   }

   const usuario = await Usuario.findById(userId)
      .select({ password: 0 })
      .exec();

   if (!usuario) {
      return res.status(404).json({
         mensaje: 'El usuario no se encuentra registrado',
         status: 404
      });
   }

   res.status(200).json({
      usuario
   });
}

/**      Retorna todos los usuarios     */
module.exports.getAllUsuarios = async (req, res) => {
   let usuarios = await Usuario.find({})
      .select({ password: 0 })
      .exec();

   return res.status(200).json({
      usuarios
   });
}

/**      Guardar nuevo usuario en la base de datos */
module.exports.saveUsuario = async (req, res, next) => {

   let email = req.body.email;

   // Buscar si el correo electronico ya existe en la BD
   const usuario = await Usuario.findOne({ email: email });
   if (usuario) {
      return res.status(400).json({
         mensaje: 'El usuario con ese email ya se encuentra registrado. Inserte otro correo',
         status: 400
      });
   }

   // Contraseñas iguales
   if (req.body.password != req.body.confirmpassword) {
      return res.status(400).json({
         statusCode: 400,
         mensaje: 'Las constraseñas no son iguales'
      });
   }

   // Generar password encriptado
   let passwordEncriptado = await bcrypt.hash(req.body.password, 12);

   let usuarioNuevo = new Usuario({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: email,
      password: passwordEncriptado,
      estado: 1
   });

   usuarioNuevo.save((err, usuarioGuardado) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error al guardar el usuario',
            error: err,
            status: 500
         });
      }

      usuarioGuardado.password = '-----';

      return res.status(200).json({
         mensaje: 'Usuario guardado correctamente',
         status: 200,
         usuario: usuarioGuardado
      });
   });
}

/**      Actualizar usuario */
module.exports.updateUsuario = async (req, res) => {
   let userId = req.params.id;

   Usuario.findById(userId, (err, usuario) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error al obtener el usuario',
            error: err,
            status: 500
         });
      }

      if (!usuario) {
         return res.status(404).json({
            status: 404,
            mensaje: 'Error. Usuario inexistente'
         });
      }

      // Actualiza valores
      if (req.body.nombre != null) usuario.nombre = req.body.nombre;
      if (req.body.apellidos != null) usuario.apellidos = req.body.apellidos;
      if (req.body.email != null) usuario.email = req.body.email;

      usuario.save((err, usuarioUpdate) => {
         if (err) {
            return res.status(500).json({
               mensaje: 'Error al actualizar el usuario',
               error: err,
               status: 500
            });
         }

         usuarioUpdate.password = '-----';

         return res.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            status: 200,
            usuario: usuarioUpdate
         });
      });
   });
}
