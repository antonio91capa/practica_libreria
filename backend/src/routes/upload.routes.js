const router = require('express').Router();

const { uploadImagen } = require('../controller/upload');

router.post('/:tipo/:id', uploadImagen);

module.exports = router;