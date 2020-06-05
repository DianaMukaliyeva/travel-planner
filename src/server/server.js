/* Global variables */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = [];

/* Set up */

// Setup dotenv
// const dotenv = require('dotenv');
// dotenv.config();

// Set up an instance of app
const app = express();
app.use(express.static('dist'));

//Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors for cross origin allowance
app.use(cors());

app.listen(5000, () => {
    console.log('Travel app running on port 5000!');
});

/* Endpoints */

app.get('/', (req, res) => {
    res.sendFile('dist.html');
})

app.post('/cityDetails', (req, res) => {
    data.push(req.body);
    // console.log(data);
})

app.post('/weatherData', (req, res) => {
    console.log(req.body);
    data.push(req.body);
    console.log(data);
})

app.post('/images', (req, res) => {
    console.log(req.body);
    data.push(req.body);
    console.log(data);
})

app.get('/data', (req, res) => {
    // res.send(data);
    console.log(data);
    res.json(data[0]);
})
