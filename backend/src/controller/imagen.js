const path = require('path');
const fs = require('fs-extra');

module.exports.obtenerImagen = (req, res) => {
   let tipo = req.params.tipo;
   let nombreImagen = req.params.nombre;
   let rutaImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
   let noImagen = path.resolve(__dirname, `../assets/no-imagen.jpg`);

   if (fs.existsSync(rutaImagen)) {
      return res.sendFile(rutaImagen);
   } else {
      return res.sendFile(noImagen);
   }
}