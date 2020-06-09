import { fillModal } from './modalFiller';
import { toggleModal } from './init';

/**
 * function that sends post request to the server.
 * @param {data} object example
 *    {
 *        city: string, - name of the city
 *        departDate: number, - time in millisekonds
 *        timeOffset: number, - time difference UTC and local time
 *    }
*/
const getTripInformation = async (url, data) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const data = await request.json();
        return data;
    } catch (error) {
        return ({success: false});
    }
};

/**
 * function that calls two functions, one of which will show modal window,
 * another one will fill that window with information.
 * @param {trip} object example:
 *    {
 *        city: string, - name of the city
 *        cityId: number, - id of the city
 *        country: string, - name of the country
 *        departDate: number, - time in millisekonds
 *        highTemp: number, - high temperature in Celcius
 *        lowTemp: number, - low temperature in Celcius
 *        imageUrl: string, - url of image
 *        weather: string - descrpiption of weather
 *    }
*/
const handleEvent = (trip) => {
    fillModal(trip, 'Save Trip', -1);
    toggleModal();
};

/** Function that called on form */
export const handleSearch = async (event) => {
    event.preventDefault();

    // get the user's input
    const city = document.getElementById('city').value;
    const date = document.getElementById('depart_date').value;

    //get offset in order to show correct value despite of timezone
    const now = new Date();
    const timeOffset = now.getTimezoneOffset() * 60000;

    const data = {
        city: city,
        departDate: date,
        timeOffset: timeOffset
    };

    //call function to send post request to the server with given data
    const trip = await getTripInformation('http://localhost:5000/tripInfo', data);

    //in case of error give an alert, otherwise call function handleEvent
    trip.success ? handleEvent(trip.trip) : alert('Couldn\'t find city with this name');
};
