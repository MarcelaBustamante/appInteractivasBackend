const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');
var app = express();

// Lectura y parseo de body
app.use(express.json());

// Database
dbConnection();

// Directorio publico
app.use(express.static('public'));

// CORS
app.use(cors());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));


app.listen(process.env.PORT, function () {
    console.log('Example app listening on port ' + process.env.PORT);
});

