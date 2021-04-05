const mongoose = require('mongoose');
const config = require('../configuracion/config');

const conectarDB = async () => {
   try {
      await mongoose.connect(config.database_url, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      });

      console.log('MongoDB esta conectado correctamente');
   } catch (error) {
      console.log('Error en la conexion a la Base de datos', error);
      process.exit(1);
   }
}

module.exports = conectarDB;