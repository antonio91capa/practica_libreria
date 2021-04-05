const jwt = require('jsonwebtoken');

const config = require('../configuracion/config');

// Generar Token JWT
const generarToken = (usuario) => {
   console.log('Usuario: ' + usuario);
   usuario.password = '';

   let payload = {
      usuario: usuario
   }

   const token = jwt.sign(payload, config.jwt_secret, {
      algorithm: "HS256",
      expiresIn: '24h'
   });

   return token;
}

// Verificar si el usuario esta autenticado para acceder al sistema
const isAuthenticated = (req, res, next) => {
   if (!req.headers.authorization) {
      return res.status(403).json({
         mensaje: 'Error. No esta autenticado para acceder dicho recurso',
         statusCode: 403
      });
   }

   let token = req.header.authorization;
   token = token.replace(/['"]+/g, '');

   jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
         return res.status(401).json({
            status: 401,
            mensaje: 'El token no es valido',
            error
         });
      }

      req.usuario = decoded.usuario;
      next();

   });
}

const isRoleAdmin = (req, res, next) => {
   let usuario = req.usuario;

   if (usuario.role === 'ADMIN_ROLE') {
      next();
   } else {
      return res.status(401).json({
         statusCode: 401,
         mensaje: 'No tienes permisos',
         error: 'No tienes el rol administrador'
      });
   }
}

// Verificar si el usuario esta autenticado y si tiene el role administrador para acceder dicho recurso

module.exports = {
   isAuthenticated, generarToken, isAuthenticated, isRoleAdmin
};