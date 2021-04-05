const mongoose = require('mongoose');

const CopiaLibro = require('../models/copiaLibro');

module.exports.getAllCopiaLibros = async (req, res) => {
   let copiaLibros = await CopiaLibro.find({});

   return res.status(200).json({
      copias: copiaLibros
   });
}

module.exports.getCopiaLibroDetails = async (req, res) => {
   let copiaId = req.params.id;

   const copia = await CopiaLibro.findById(copiaId)
      .populate('libro', '_id titulo descripcion autor');

   return res.status(200).json({
      copia
   });
}

module.exports.crearCopiaLibro = async (req, res) => {
   const copiaLibro = new CopiaLibro({
      libro: req.body.libro,
      estado: req.body.estado
   });

   await copiaLibro.save();

   return res.status(202).json({
      mensaje: 'Copia Libro creada correctamente',
      statusCode: 202,
      copiaLibro
   });
}

/**      Actualizar copia libro      */

/**      Eliminar copia libro        */
module.exports.deleteCopiaLibro = async (req, res) => {
   let copiaLibroId = req.params.id;

   // Validar el parametro id sea correcta
   if (!mongoose.Types.ObjectId.isValid(copiaLibroId)) {
      return res.status(400).json({
         mensaje: 'El parametro id es incorrecto',
         status: 400
      });
   }

   CopiaLibro.findById(copiaLibroId, (err, copiaLibro) => {
      if (!copiaLibro) {
         return res.status(404).json({
            statusCode: 404,
            mensaje: 'Copia del libro no se encuentra o no esta registrado'
         });
      }

      copiaLibro.remove();

      return res.status(200).json({
         mensaje: 'Copia del Libro eliminado correctamente',
         statusCode: 200
      });
   });
}
