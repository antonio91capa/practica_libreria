const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrestamoSchema = new Schema({
   usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El usuario es obligatorio']
   },
   libro: {
      type: Schema.Types.ObjectId,
      ref: 'CopiaLibro',
      required: [true, 'El libro es obligatorio'],
   },
   fecha_prestamo: {
      type: Date,
      required: true
   },
   fecha_entrega: {
      type: Date
   },
   estado_prestamo: {
      type: String,
      enum: ['Prestado', 'Completado', 'Cancelado'],
      required: true
   }
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);