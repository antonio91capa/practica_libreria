const router = require('express').Router();

const { prestamoLibroAUsuario, devolucionLibro, getLibrosPrestadosUsuario } = require('../controller/prestamo');

router.post('/prestar', prestamoLibroAUsuario);
router.post('/devolucion/:id', devolucionLibro);
router.get('/usuario/:usuarioId', getLibrosPrestadosUsuario);

module.exports = router;