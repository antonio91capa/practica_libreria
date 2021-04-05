const router = require('express').Router();
const { body } = require('express-validator');

const { getUsuario, getAllUsuarios, saveUsuario, updateUsuario } = require('../controller/usuario');

router.get('/:id', getUsuario);
router.get('/', getAllUsuarios);
router.post('/', [
   body('nombre', 'El nombre es obligatorio').notEmpty(),
   body('apellidos', 'El apellido es obligatorio').notEmpty(),
   body('email', 'El correo electronico es obligatorio').notEmpty(),
   body('password', 'La contraseña es obligatoria').notEmpty(),
   body('confirmPassword', 'La confirmacion de contraseña es obligatoria').notEmpty()
], saveUsuario);

module.exports = router;