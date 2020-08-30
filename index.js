// Required imports
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Express
const app = express();

// CORS & Environment
app.use(cors());

// Database
dbConnection();

// Paths
app.get('/', (req, res) => {
    res.json({
        name: "appInteractivasBackend",
	    version: "1.0.0"
    })
})

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port ' + process.env.PORT);
});