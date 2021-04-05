const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const LibroSchema = new Schema({
   titulo: {
      type: String,
      required: [true, 'El titulo es obligatorio']
   },
   descripcion: {
      type: String
   },
   categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: [true, 'La categoria es obligatoria']
   },
   autor: {
      type: Schema.Types.ObjectId,
      ref: 'Autor',
      required: [true, 'El autor es obligatorio']
   },
   imagen: {
      type: String,
      required: false
   },
   isbn: {
      type: String,
      unique: true
   },
   idioma: {
      type: String
   },
   editorial: {
      type: String
   },
   paginas: {
      type: Number
   }
});

module.exports = mongoose.model('Libro', LibroSchema);