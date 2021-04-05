const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AutorSchema = new Schema({
   nombre: {
      type: String,
      required: true
   },
   apellidos: {
      type: String
   },
   fecha_nacimiento: {
      type: Date,
   },
   fecha_fallecimiento: {
      type: Date
   }
}, {
   collection: 'autores'
});

// Establecer campo virtual para convertir/castear fechas
AutorSchema.virtual('fechanacimiento').get(function () {
   // el valor devuelto será un string en formato 'yyyy-mm-dd'
   return this.fecha_nacimiento.toISOString().substring(0, 10);
});

module.exports = mongoose.model('Autor', AutorSchema);