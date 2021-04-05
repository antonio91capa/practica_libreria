const createError = require('http-errors');

// Especificacion del error 404
module.exports.error404Handler = (req, res, next) => {
   next(createError(404, "La ruta que quiere acceder no se encuentra"));
};

module.exports.errorHandler = (error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         mensaje: error.message
      }
   });
}