const router = require('express').Router();

const { getAllCopiaLibros, getCopiaLibroDetails, crearCopiaLibro, deleteCopiaLibro } = require('../controller/copiaLibro');

router.get('/', getAllCopiaLibros);
router.get('/:id', getCopiaLibroDetails);
router.post('/', crearCopiaLibro);
router.delete('/:id', deleteCopiaLibro);

module.exports = router;