const app = require('express')();
const fileUpload = require('express-fileupload');
const fs = require('fs-extra');

const Libro = require('../models/libro');
const Usuario = require('../models/usuario');

app.use(fileUpload());

// Subir una imagen de libro o usuario al servidor.
// Asi como tambien subir o cambiar la imagen de la base de datos
module.exports.uploadImagen = (req, res) => {
   // Validar si imagen no esta vacio
   if (!req.files) {
      return res.status(400).json({
         mensaje: 'Error. Porfavor inserte una imagen',
         statusCode: 400
      });
   }

   let id = req.params.id;
   let tipo = req.params.tipo;
   let imagen = req.files.imagen;
   let nombreImagen = uuid.v4() + path.extname(imagen.name);
   const max_size_imagen = 1000000;

   // Validar que la extension de la imagen sea correcta
   let validExtensions = ['image/jpg', 'image/png', 'image/jpeg'];
   if (!validExtensions.includes(imagen.mimetype)) {
      return res.status(400).json({
         status: 400,
         statusCode: 400,
         mensaje: 'Error en la imagen.',
         descripcionError: 'Solo las extensiones jpg, jpeg y png son válidas'
      });
   }

   // Validar que el tamaño de la imagen no exceda a 1MB
   if (imagen.size >= max_size_imagen) {
      return res.status(400).json({
         statusCode: 400,
         mensaje: 'Error en la imagen.',
         descripcionError: 'El tamaño de la imagen no debe excederse a 1MB'
      });
   }

   //Subir imagen al servidor local
   let pathImagen = `uploads/${tipo}/${nombreImagen}`;

   imagen.mv(pathImagen, (err) => {
      if (err) {
         return res.status(500).json({
            statusCode: 500,
            mensaje: 'Ocurrio un error al subir la imagen en el servidor',
            error: err
         });
      }
   });

   switch (tipo) {
      case 'libros':
         uploadImagenLibros(id, tipo, nombreImagen, res);
         break;
      case 'usuarios':
         uploadImagenUsuarios(id, tipo, nombreImagen, res);
         break;
      default:
         return res.status(500).json({
            statusCode: 500,
            mensaje: 'El tipo es incorrecto. Especifique otro nombre para la imagen'
         });
         break;
   }
}

// Funcion para actualizar la imagen del libro de la base de datos
function uploadImagenLibros(id, tipo, nombreImagen, res) {
   Libro.findById(id, (err, libro) => {
      if (err) {
         // Eliminar imagen subida
         eliminarImagen(tipo, nombreImagen);

         return res.status(500).json({
            statusCode: 500,
            mensaje: 'Ocurrio un error al subir la imagen en el servidor',
            error: err
         });
      }

      if (!libro) {
         // Eliminar imagen subida
         eliminarImagen(tipo, nombreImagen);

         return res.status(500).json({
            statusCode: 500,
            mensaje: 'No existe el libro especificado'
         });
      }

      libro.imagen = nombreImagen;

      libro.save((err, libroGuardado) => {
         if (err) {
            // Eliminar imagen subida
            eliminarImagen(tipo, nombreImagen);

            return res.status(500).json({
               statusCode: 500,
               mensaje: 'Error al guardar la imagen del libro',
               error: err
            });
         }

         return res.status(200).json({
            status: 200,
            mensaje: 'La image ha sido subida correctamente',
            libro: libroGuardado
         });
      });
   });
}

// Funcion para actualizar la imagen del usuario de la base de datos
function uploadImagenUsuarios(id, tipo, nombreImagen, res) {
   Usuario.findById(id, (err, usuario) => {
      if (err) {
         // Eliminar imagen subida
         eliminarImagen(tipo, nombreImagen);

         return res.status(500).json({
            statusCode: 500,
            mensaje: 'Ocurrio un error al subir la imagen en el servidor',
            error: err
         });
      }

      if (!usuario) {
         // Eliminar imagen subida
         eliminarImagen(tipo, nombreImagen);

         return res.status(500).json({
            statusCode: 500,
            mensaje: 'No existe el libro especificado'
         });
      }

      usuario.imagen = nombreImagen;

      usuario.save((err, usuarioGuardado) => {
         if (err) {
            // Eliminar imagen subida
            eliminarImagen(tipo, nombreImagen);

            return res.status(500).json({
               statusCode: 500,
               mensaje: 'Error al guardar la imagen del usuario',
               error: err
            });
         }

         usuario.password = '----';

         return res.status(200).json({
            status: 200,
            mensaje: 'La image del usuario ha sido subida correctamente',
            usuario: usuarioGuardado
         });
      });
   });
}


// Funcion para eliminar la imagen
function eliminarImagen(tipo, nombreImagen) {
   let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

   if (fs.existsSync(pathImagen)) {
      fs.unlink(pathImagen, error => {
         if (err) {
            return res.status(500).json({
               status: 500,
               mensaje: 'Ocurrio un error al eliminar la imagen'
            });
         }
      });
   }
}
