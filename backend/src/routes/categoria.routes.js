const router = require('express').Router();
const { body } = require('express-validator');

const { isAuthenticated, isRoleAdmin } = require('../middleware/auth');

const { getCategoria, listarCategorias, saveCategoria, updateCategoria, deleteCategoria } = require('../controller/categoria');

router.get('/:id', getCategoria);
router.get('/', listarCategorias);

router.post('/', isAuthenticated, isRoleAdmin, [
   body('nombre', 'El titulo no debe estar vacio').notEmpty()
      .isLength({ min: 3 }).withMessage('El minimo de caracteres es de 3')
], saveCategoria);

router.put('/:id', [
   body('nombre', 'El titulo no debe estar vacio').notEmpty()
      .isLength({ min: 3 }).withMessage('El minimo de caracteres es de 3')
], updateCategoria);

router.delete('/:id', isAuthenticated, deleteCategoria);

module.exports = router;