const router = require('express').Router();

const { getAllAutores, getAutor, crearAutor, updateAutor, deleteAutor } = require('../controller/autor');

router.get('/', getAllAutores);
router.get('/:id', getAutor);
router.post('/', crearAutor);
router.put('/:id', updateAutor);
router.delete('/:id', deleteAutor);

module.exports = router;