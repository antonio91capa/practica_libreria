const uuid = require('uuid');
const path = require('path');

module.exports.uploadImagenes = (directorio, req, callback) => {

   let imagen = req.files.imagen;
   let nombreImagen = uuid.v4() + path.extname(imagen.name);

   // Validar que la extension de la imagen sea correcta
   let validExtensions = ['image/jpg', 'image/png', 'image/jpeg'];
   if (!validExtensions.includes(imagen.mimetype)) {
      /*return callback({
         statusCode: 400,
         mensaje: 'Error en la imagen.',
         descripcionError: 'Solo las extensiones jpg, jpeg y png son válidas'
      }, null);*/

      return callback(new Error('Error en la imagen. Solo las extensiones jpg, jpeg y png son válidas'), null);
   }

   // Validar que el tamaño de la imagen no exceda a 1MB
   if (imagen.size >= 1000000) {
      return callback({
         statusCode: 400,
         mensaje: 'Error en la imagen.',
         descripcionError: 'El tamaño de la imagen no debe excederse a 1MB'
      }, null);
   }

   //Subir imagen al servidor local
   try {
      imagen.mv(`uploads/${directorio}/${nombreImagen}`);

      //return nombreImagen;
      callback(null, nombreImagen);
   } catch (error) {
      /*return res.status(500).json({
         statusCode: 500,
         mensaje: 'Ocurrio un error al subir la imagen en el servidor',
         error: err
      });*/

      return callback({
         statusCode: 500,
         mensaje: 'Ocurrio un error al subir la imagen en el servidor',
         descripcionError: error
      }, null);
   }
}
