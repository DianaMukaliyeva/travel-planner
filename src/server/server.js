
/* Global variables */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const trips = {};
let id = 0;
let trip = {};


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

const port = 5000;
app.listen(process.env.PORT || port, () => {
    console.log(`Travel app running on port ${port}!`);
});


/* Functions */

/**
 * function that sends request to the geonames server.
 * @param {city} string the user entered name of city
 * @param {user} string geoname's user
 */
const getCityDetail = async (city, user) => {
    const request = await fetch(`http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=${user}`);
    const res = await request.json();

    trip.city = res.geonames[0].name;
    trip.country = res.geonames[0].countryName;
    trip.cityId = res.geonames[0].geonameId;
}

/**
 * function that sends request to the weatherbit server.
 * @param {url} url url with some parameters
 * @param {userKey} string key needed to get information from server
 * @param {cityId} number city ID
 * @param {diff} number time left to that trip in milliseconds
 */
const getForecast = async (url, userKey, cityId, diff) => {
    const request = await fetch(`${url}&city_id=${cityId}&key=${userKey}`);
    try {
        const res = await request.json();
        const days = diff/1000/60/60/24;
        trip.days = days;
        if (days < 16 && days > 0) {
            trip.weather = res.data[days].weather.description;
            trip.highTemp = res.data[days].high_temp;
            trip.lowTemp = res.data[days].low_temp;
        } else {
            trip.highTemp = res.data[0].max_temp;
            trip.lowTemp = res.data[0].min_temp;
        }
    } catch (error) {
        // console.log(error);
        trip.weather = 'No forecast for this city';
    }
}

/**
 * function that sends request to the pixabay server.
 * @param {key} string key needed to get information from server
 */
const getPicture = async (key) => {
    const request = await fetch(`https://pixabay.com/api/?image_type=photo&key=${key}&q=${trip.city}+${trip.country}`);
    try {
        const res = await request.json();
        if (res.totalHits < 1) {
            trip.imageUrl = 'https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_1280.jpg';
        } else {
            trip.imageUrl = res.hits[0].webformatURL;
        }
    } catch (error) {
        trip.imageUrl = 'https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_1280.jpg';
    }
}


/* Endpoints */

/** @api {get} / returns main page */
app.get('/', (req, res) => {
    res.sendFile('dist.html');
})

/**
 * @api {post} /tripInfo
 * @apiDescription
 * Find all information about trip and add it to current trip
 * Returns success status and current trip
 * @apiParam {city} string user entered city name
 * @apiParam {timeOffset} number timeoffset in milliseconds
 * @apiParam {departDate} string format YYYY-MM-DD
 * @apiParamExample {json} Request-Example:
 *     {
 *         'city': 'Paris',
 *         'timeOffset': 150000000,
 *         'departDate': 2020-12-21
 *     }
 */
app.post('/tripInfo', async (req, res) => {
    // reset current trip
    trip = {};

    try {
        const city = req.body.city;
        const timeOffset = req.body.timeOffset;
        const date = new Date(req.body.departDate);
        trip.departDate = date.getTime();
        const dateNow = new Date().setHours(0,0,0,0);
        const oneDay = 60 * 60 * 1000 * 24;
        const diff = trip.departDate - dateNow + timeOffset;

        let url = '';
        if (diff < 0) {
            url = `https://api.weatherbit.io/v2.0/history/daily?start_date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}&end_date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
        } else if (diff > oneDay * 15) {
            url = `https://api.weatherbit.io/v2.0/history/daily?start_date=${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()}&end_date=${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()+1}`
        } else {
            url = `http://api.weatherbit.io/v2.0/forecast/daily?`
        }

        await getCityDetail(city, process.env.GEONAME_USER);
        await getForecast(url, process.env.WEATHER_KEY, trip.cityId, diff);
        await getPicture(process.env.PIXABAY_KEY);

        res.json({
            success: true,
            trip: trip
        });
    } catch (error) {
        res.send({success: false});
    }
})

/**
 * @api {get} /saveTrip Add current trip to all trips and Returns current trip
 */
app.get('/saveTrip', (req, res) => {
    trips[id] = trip;
    id++;

    res.json({trip: trip});
})

app.delete('/trips/:id', (req, res) => {
    try {
        const id = req.params.id;
        delete trips[id];
        res.send({success: true});
    } catch (error) {
        res.send({success: false});
    }
})

/** @api {get} /trips Get all saved trips*/
app.get('/trips', (req, res) => {
    res.json(trips);
})
