// Required imports
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Express
const app = express();

// CORS & Environment
app.use(cors());

// Request's Body parsing
app.use(express.json());

// Database
dbConnection();

// Paths
app.use('/api/users', require('./routes/users.routes'));

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port ' + process.env.PORT);
});