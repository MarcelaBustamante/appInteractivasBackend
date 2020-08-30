//Express
const express = require('express');
const app = express();
require('dotenv').config();

// DataBase Configuration
const { dbConnection } = require('./database/config');
dbConnection();

//Paths
app.get('/', (req, res) => {
    res.json({
        name: "appInteractivasBackend",
	    version: "1.0.0"
    })
})

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port ' + process.env.PORT);
});