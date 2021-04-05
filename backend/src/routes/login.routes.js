const router = require('express').Router();
const { body } = require('express-validator');

const { login } = require('../controller/login');

router.post('/login', [
   body('email', 'El email es requerido').notEmpty(),
   body('password', 'El password es requerido').notEmpty()
], login);

module.exports = router;