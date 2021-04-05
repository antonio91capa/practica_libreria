require('dotenv').config();

const config = require('./configuracion/config');
const app = require('./app');

app.listen(config.port, () => {
   console.log(`Server is up on http://localhost:${config.port}`);
});