//Express
const express = require('express');
const app = express();

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

app.listen(3000, () => {
    console.log('Example app listening on port ' + 3000);
});