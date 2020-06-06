/* Global variables */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
let data = {};

/* Set up */

// Setup dotenv
const dotenv = require('dotenv');
dotenv.config();

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

app.post('/tripInfo', async (req, res) => {
    try {
        const city = req.body.city;
        const timeOffset = req.body.timeOffset;
        const date = new Date(req.body.departDate);
        data.departDate = date.getTime();
        const dateNow = new Date().setHours(0,0,0,0);
        const oneDay = 60 * 60 * 1000 * 24;
        const diff = data.departDate - dateNow + timeOffset;
        let url = '';
        if (diff > oneDay * 15) {
            url = `https://api.weatherbit.io/v2.0/history/daily?start_date=${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()}&end_date=${date.getFullYear()-1}-${date.getMonth()}-${date.getDate()+1}`
        } else {
            url = `http://api.weatherbit.io/v2.0/forecast/daily?`
        }
        await getCityDetail(city, process.env.GEONAME_USER);
        await getForecast(url, process.env.WEATHER_KEY, data.cityId, diff);
        await getPicture(process.env.PIXABAY_KEY);
        res.json({success: 'success'});
        // res.json(data);
    } catch (error) {
        res.json({error: 'error'});
    }
})

const getCityDetail = async (city, user) => {
    const request = await fetch(`http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=${user}`);
    const res = await request.json();
    data.city = res.geonames[0].name;
    data.country = res.geonames[0].countryName;
    data.cityId = res.geonames[0].geonameId;
}

const getForecast = async (url, userKey, cityId, diff) => {
    const request = await fetch(`${url}&city_id=${cityId}&key=${userKey}`);
    try {
        const res = await request.json();
        const days = diff/1000/60/60/24;
        if (days < 16) {
            // console.log(res.data[days]);
            data.weather = res.data[days];
        } else {
            // console.log(res.data[0]);
            data.weather = res.data[0];
        }
    } catch (error) {
        // console.log('no data');
        data.weather = null;
    }
}

const getPicture = async (key) => {
    const request = await fetch(`https://pixabay.com/api/?image_type=photo&key=${key}&q=${data.city}+${data.country}`);
    try {
        const res = await request.json();
        if (res.totalHits < 1) {
            // console.log('no heats');
            data.imageUrl = 'https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_1280.jpg';
        } else {
            // console.log(res.hits[0]);
            data.imageUrl = res.hits[0].webformatURL;
        }
    } catch (error) {
        data.imageUrl = 'https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_1280.jpg';
    }
}

app.get('/data', (req, res) => {
    console.log(data);
    res.json(data);
})
