const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CopiaLibroSchema = new Schema({
   libro: {
      type: Schema.Types.ObjectId,
      ref: 'Libro',
      required: true
   },
   estado: {
      type: String,
      enum: ['Disponible', 'Mantenimiento', 'Robado', 'Perdido', 'Reservado'],
      required: true
   }
});

module.exports = mongoose.model('CopiaLibro', CopiaLibroSchema);