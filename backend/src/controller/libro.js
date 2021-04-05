const Libro = require('../models/libro');
const { uploadImagenes } = require('../middleware/uploadImagen');

/**      Obtener todos los libros    */
module.exports.getAllLibros = async (req, res) => {
   let libros = await Libro.find({})
      .populate('categoria', '_id nombre')
      .populate('autor', '_id nombre apellidos')
      .exec();

   return res.status(200).json({
      libros
   });
}

/**      Obtener un libro      */
module.exports.getLibro = async (req, res) => {
   let libroId = req.params.id;

   const libro = await Libro.findById(libroId)
      .populate('categoria')
      .exec();

   return res.status(200).json({
      libro
   });
}

/**      Guardar un libro      */
module.exports.guardarLibro = async (req, res, next) => {

   // Validar si imagen no esta vacio
   if (!req.files) {
      return res.status(400).json({
         mensaje: 'Error. Porfavor inserte una imagen',
         statusCode: 400
      });
   }

   // Validaciones de la imagen a subir y retorna un nuevo nombre unico de la imagen
   let imagenLibro = "";
   uploadImagenes('libros', req, (err, imagen) => {
      if (err) {
         console.log('Error: ', err);
         return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            mensaje: err.mensaje,
            descripcion: err.descripcionError
         });
      }

      console.log('Imagen: ', imagen);
      imagenLibro = imagen;

      // Crear el objeto libro
      let libro = new Libro({
         titulo: req.body.titulo,
         descripcion: req.body.descripcion,
         categoria: req.body.categoria,
         autor: req.body.autor,
         imagen: imagenLibro,
         isbn: req.body.isbn,
         idioma: req.body.idioma,
         editorial: req.body.editorial,
         paginas: req.body.paginas
      });

      // Guardar el libro
      libro.save((err, libroGuardado) => {
         if (err) {
            return res.status(500).json({
               mensaje: 'Error al guardar el libro',
               statusCode: 500,
               error: err
            });
         }

         return res.status(202).json({
            mensaje: 'Libro guardado correctamente',
            statusCode: 202,
            libro: libroGuardado
         });
      });
   });
}

/**      Actualizar un libro      */
module.exports.updateLibro = async (req, res) => {
   let libroId = req.params.id;

   const libro = await Libro.findById(libroId);
   if (!libro) {
      return res.status(404).json({
         mensaje: 'Este libro no se encuentra registrado',
         status: 404
      });
   }

   // Actualizar valores
   if (req.body.titulo != null) libro.titulo = req.body.titulo;
   if (req.body.descripcion != null) libro.descripcion = req.body.descripcion;
   if (req.body.categoria != null) libro.categoria = req.body.categoria;
   if (req.body.autor != null) libro.autor = req.body.autor;
   if (req.body.imagen != null) libro.imagen = req.body.imagen;
   if (req.body.isbn != null) libro.isbn = req.body.isbn;
   if (req.body.idioma != null) libro.idioma = req.body.idioma;
   if (req.body.editorial != null) libro.editorial = req.body.editorial;
   if (req.body.pagina != null) libro.paginas = req.body.paginas;

   await libro.save();

   return res.status(200).json({
      mensaje: 'Libro actualizado correctamente',
      statusCode: 200,
      libro
   });
}

/**      Eliminar un libro        */
module.exports.deleteLibro = async (req, res) => {
   let libroId = req.params.id;

   Libro.findByIdAndDelete(libroId, (err) => {
      if (err) {
         return res.status(500).json({
            statusCode: 500,
            mensaje: 'Error al eliminar el libro',
            error: err
         });
      }

      return res.status(200).json({
         mensaje: 'Libro eliminado correctamente',
         statusCode: 200
      });
   });

   // NOTA: agregar logica de si elimino el libro, tambien eliminar las copia de libros, 
   // siempre y cuando no existan copias prestadas
}

// Funcion para eliminar una imagen
// function deleteImagen(req, res, next) {}