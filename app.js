const express = require('express');
const { dbConnection } = require('./config/database');
require('dotenv').config();

const app = express();
// Import routes
const users = require('./routes/users')
const auth = require('./routes/auth')
const workshops = require('./routes/workshops')
// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use('/users', users)
app.use('/auth', auth)
app.use('/workshops', workshops)


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
