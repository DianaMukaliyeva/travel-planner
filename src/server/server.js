/* Global variables */

const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');

/* Set up */

// Set up an instance of app
const app = express();
app.use(express.static('dist'));

//Cors for cross origin allowance
app.use(cors());

app.listen(5000, () => {
    console.log('Travel app running on port 5000!');
});

/* Endpoints */

app.get('/', (req, res) => {
    res.sendFile('dist.html');
})

