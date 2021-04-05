var mongoose = require('mongoose');

const { ROLES } = require('../helpers/constantes');

const UsuarioSchema = new mongoose.Schema({
   nombre: {
      type: String,
      required: true
   },
   apellidos: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      enum: ROLES,
      default: ROLES.user,
      required: true,
   },
   estado: {
      type: Number,
      required: true
   },
   imagen_perfil: {
      type: String,
      required: false
   }
}, {
   timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);