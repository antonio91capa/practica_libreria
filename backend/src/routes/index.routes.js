const express = require('express');
const app = express();

const usuarioRoute = require('./usuario.routes');
const categoriaRoute = require('./categoria.routes');
const libroRoute = require('./libro.routes');
const autorRoute = require('./autor.routes');
const copiaLibroRoute = require('./copialibro.routes');
const prestamoRoute = require('./prestamo.routes');
const loginRoute = require('./login.routes');
const uploadRoute = require('./upload.routes');
const obtenerImagen = require('./imagen.routes');

app.use('/api/v1/usuario', usuarioRoute);
app.use('/api/v1/categoria', categoriaRoute);
app.use('/api/v1/libro', libroRoute);
app.use('/api/v1/autor', autorRoute);
app.use('/api/v1/copialibro', copiaLibroRoute);
app.use('/api/v1/prestamo', prestamoRoute);
app.use('/upload', uploadRoute);
app.use('/imagen', obtenerImagen);
app.use('/auth', loginRoute);

module.exports = app;