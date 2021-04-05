const mongoose = require('mongoose');
const Autor = require('../models/autor');

/**      Retorna todos los autores      */
module.exports.getAllAutores = async (req, res) => {
   let autores = await Autor.find({});

   return res.status(200).json({
      autores
   });
}

/**      Retorna un autor      */
module.exports.getAutor = async (req, res) => {
   let autorId = req.params.id;

   if (!mongoose.Types.ObjectId.isValid(autorId)) {
      return res.status(400).json({
         mensaje: 'El parametro id es incorrecto',
         status: 400
      });
   }

   let autor = await Autor.findById(autorId);

   return res.status(200).json({
      autor
   });
}

/**      Crear un nuevo autor     */
module.exports.crearAutor = async (req, res) => {
   let autor = new Autor({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      fecha_nacimiento: req.body.fecha_nacimiento == null ? null : new Date(req.body.fecha_nacimiento),
      fecha_fallecimiento: req.body.fecha_fallecimiento == null ? null : new Date(req.body.fecha_fallecimiento)
   });

   await autor.save();

   return res.status(202).json({
      mensaje: 'Autor guardado correctamente',
      statusCode: 202,
      autor
   });
}

/**      Actualizar un autor       */
module.exports.updateAutor = async (req, res) => {
   let autorId = req.params.id;
   const autor = await Autor.findById(autorId);

   if (!autor) {
      return res.status(400).json({
         mensaje: 'El autor no se encuentra registrado',
         statusCode: 404
      });
   }

   if (req.body.nombre != null) autor.nombre = req.body.nombre;
   if (req.body.apellidos != null) autor.apellidos = req.body.apellidos;
   if (req.body.fecha_nacimiento != null) autor.fecha_nacimiento = req.body.fecha_nacimiento;
   if (req.body.fecha_fallecimiento != null) autor.fecha_fallecimiento = req.body.fecha_fallecimiento;

   await autor.save();

   return res.status(200).json({
      mensaje: 'Autor actualizado correctamente',
      statusCode: 200
   });
}

/**      Eliminar un autor     */
module.exports.deleteAutor = async (req, res) => {
   let autorId = req.params.id;

   await Autor.findByIdAndDelete(autorId);

   return res.status(200).json({
      mensaje: 'Autor eliminado correctamente',
      statusCode: 200
   });
}
