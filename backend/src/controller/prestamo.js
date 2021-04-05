const mongoose = require('mongoose');

const CopiaLibro = require('../models/copiaLibro');
const Prestamo = require('../models/prestamo');
const Usuario = require('../models/usuario');

const NUMERO_MAXIMO_PRESTAMO_LIBROS = 3;

/**      Realiza el prestamo de libros al usuario */
module.exports.prestamoLibroAUsuario = async (req, res) => {

   let idusuario = req.body.usuario;
   let idlibro = req.body.libro;

   // Validar si la Copia del libro existe
   const copiaLibro = await CopiaLibro.findById(idlibro);
   if (!copiaLibro) {
      return res.status(404).json({
         mensaje: 'La copia de este libro no se encuentra',
         statusCode: 404
      });
   }

   // Validar que el libro a prestar no este en mantenimiento, perdido, robado u otro estado que no sea Disponible
   if (copiaLibro.estado != 'Disponible') {
      return res.status(400).json({
         mensaje: 'Este libro no se puede prestar. Esta en estado: ' + copiaLibro.estado,
         statusCode: 400
      });
   }

   // Validar si el usuario tiene libros prestado
   const numeroLibrosPrestados = await Prestamo.find({ usuario: idusuario, estado_prestamo: 'Prestado' });
   if (numeroLibrosPrestados.length == NUMERO_MAXIMO_PRESTAMO_LIBROS) {
      return res.status(400).json({
         mensaje: 'El usuario ya no puede reservar mas libros. Tiene el numero maximo de libros prestado',
         statusCode: 400
      });
   }

   // Validar si el usuario existe
   const usuario = await Usuario.findById(idusuario);
   if (!usuario) {
      return res.status(404).json({
         mensaje: 'El usuario no esta registrado',
         statusCode: 404
      });
   }

   // Validar si el libro ya esta prestado
   const copiaPrestada = await Prestamo.find({ libro: copiaLibro._id, estado_prestamo: { $ne: 'Prestado' } });
   if (copiaPrestada.length > 0) {
      return res.status(400).json({
         mensaje: 'Este libro se encuentra prestado',
         statusCode: 400
      });
   }

   const prestamo = new Prestamo({
      usuario: idusuario,
      libro: idlibro,
      fecha_prestamo: new Date(),
      fecha_entrega: null,
      estado_prestamo: 'Prestado'
   });

   // Cambiar estado de la copia del libro a reservado
   copiaLibro.estado = 'Reservado';

   await prestamo.save();
   await copiaLibro.save();

   return res.status(202).json({
      mensaje: 'Prestamo realizado correctamente',
      statusCode: 202
   });
}

/**      Realiza la entrega de libros prestados a la biblioteca       */
module.exports.devolucionLibro = async (req, res) => {
   let prestamoId = req.params.id;

   // Validacion si el prestamo del libro existe
   const prestamo = await Prestamo.findOne({ _id: prestamoId });
   if (!prestamo) {
      return res.status(404).json({
         mensaje: 'No existe ningun prestamo de este libro',
         statusCode: 404
      });
   }

   const copiaLibro = await CopiaLibro.findOne({ libro: prestamo.libro });
   if (!copiaLibro) {
      return res.status(404).json({
         mensaje: 'No existe ningun libro prestado',
         statusCode: 404
      });
   }

   // Prestamo
   prestamo.estado_prestamo = 'Completado';
   prestamo.fecha_entrega = new Date();

   // Copia Libro
   copiaLibro.estado = 'Disponible';

   await prestamo.save();
   await copialibro.save();

   return res.status(200).json({
      mensaje: 'La devolucion del libro ha sido exitoso',
      statusCode: 200
   });
}

/**      Listar todos los libro prestados y devueltos del usuario       */
module.exports.getLibrosPrestadosUsuario = async (req, res) => {
   let usuario = req.params.usuarioId;

   let prestamo = await Prestamo.find({ usuario: usuario }, '_id libro fecha_prestamo fecha_entrega estado_prestamo')
      .populate('libro', '_id libro');

   if (!prestamo) {
      return res.status(404).json({
         mensaje: 'No existe ningun prestamo de este libro',
         statusCode: 404
      });
   }

   return res.status(200).json({
      prestamos: prestamo
   });
}

module.exports.listarLibrosPrestados = async (req, res) => {
   let prestamos = await Prestamo.find({ fecha_entrega: null })
      .populate('alumno', '_id nombre email')
      .populate('libro', '_ id libro')
      .exec();

   if (!prestamos) {
      return res.status(200).json({
         mensaje: 'No existen prestamos',
      });
   }

   return res.status(200).json({
      status: 200,
      prestamos
   })
}

module.exports.listarTodosPrestamos = async (req, res) => {
   let prestamos = await Prestamo.find({})
      .populate('alumno', '_id nombre email')
      .populate('libro', '_ id libro')
      .exec();

   return res.status(200).json({
      status: 200,
      prestamos
   })
}