const router = require('express').Router();

const { obtenerImagen } = require('../controller/imagen');

router.post('/:tipo/:nombre', obtenerImagen);

module.exports = router;