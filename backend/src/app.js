const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { error404Handler, errorHandler } = require('./middleware/errorsMiddleware');
const conectarDB = require('./database/db');

// Inicializacion
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Archivo estatico /uploads
app.use(express.static(path.join(__dirname, '../uploads')));

// CORS
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   next();
});

// API Router
app.use(require('./routes/index.routes'));

app.disable("x-powered-by");

//Coneccion a la Base de datos
conectarDB();

// Validar errores 404 y/o 500
app.use(error404Handler);
app.use(errorHandler);

module.exports = app;