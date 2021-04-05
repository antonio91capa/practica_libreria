const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
   nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio']
   }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);