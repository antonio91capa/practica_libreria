const router = require('express').Router();

const { getAllLibros, getLibro, guardarLibro, updateLibro, deleteLibro } = require('../controller/libro');

router.get('/',  getAllLibros);
router.get('/:id', getLibro);
router.post('/', guardarLibro);
router.put('/:id', updateLibro);
router.delete('/:id', deleteLibro);

module.exports = router;