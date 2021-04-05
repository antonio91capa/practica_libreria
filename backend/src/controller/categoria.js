const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Categoria = require('../models/categoria');

/**   Obtener una categoria en especifico */
module.exports.getCategoria = async (req, res) => {
   let categoriaId = req.params.id;

   if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
      return res.status(400).json({
         mensaje: 'El parametro id es incorrecto',
         status: 400
      });
   }

   const categoria = await Categoria.findById(categoriaId, (err) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error al consultar la categoria',
            error: err,
            status: 500
         });
      }
   });

   if (!categoria) {
      return res.status(404).json({
         mensaje: `La categoria ${req.body.name} no se encuentra registrado`,
         status: 404
      });
   }

   return res.status(201).json({
      categoria
   });
}

/**   Listar todas las categorias */
module.exports.listarCategorias = async (req, res) => {
   const categorias = await Categoria.find({});

   return res.status(200).json({
      categorias
   });
}

/**   Guardar nueva categoria */
module.exports.saveCategoria = async (req, res) => {
   
   // Validacion de campos
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         mensaje: 'Error en la validacion de datos',
         errors: errors.array()
      });
   }
   
   let nombre_categoria = req.body.nombre;

   const categoria = await Categoria.findOne({ nombre: nombre_categoria });
   if (nombre_categoria === categoria.nombre) {
      return res.status(400).json({
         mensaje: `La categoria ${req.body.name} ya existe. Ingrese otro nombre`,
         status: 400
      });
   }

   const categoriaNuevo = new Categoria({
      nombre: nombre_categoria.trim()
   });

   categoriaNuevo.save((err) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error al guardar la categoria',
            status: 500,
            error: err
         })
      }

      return res.status(200).json({
         mensaje: 'Categoria guardada correctamente',
         status: 200
      });
   });
}

/**   Actualizar categoria */
module.exports.updateCategoria = async (req, res) => {

   let idCategoria = req.params.id;
   let nombre_categoria = req.body.nombre;

   // Validacion de campos
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         mensaje: 'Error en la validacion de datos',
         errors: errors.array()
      });
   }

   const categoria = await Categoria.findOne({ nombre: nombre_categoria });
   if (categoria) {
      return res.status(400).json({
         mensaje: `La categoria ${nombre_categoria} ya existe. Ingrese otro nombre`,
         status: 400
      });
   }

   Categoria.findById(idCategoria, (err, categoriaUpdate) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error al consultar la categoria',
            error: err,
            status: 500
         });
      }

      // Establecer nuevos valores
      if (nombre_categoria != null) categoriaUpdate.nombre = nombre_categoria;

      categoriaUpdate.save((err) => {
         if (err) {
            return res.status(500).json({
               mensaje: 'Error al guardar la categoria',
               status: 500,
               error: err
            });
         }

         return res.status(200).json({
            mensaje: 'Categoria actualizada correctamente',
            status: 200
         });
      });
   });

}

/**   Eliminar genero */
module.exports.deleteCategoria = (req, res) => {
   let id = req.params.id;

   Categoria.findByIdAndDelete(id, (err) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Ocurrio un error al eliminar la categoria',
            status: 500,
            error: err
         });
      }

      return res.status(200).json({
         mensaje: 'Categoria eliminada correctamente',
         status: 200
      });
   });
}