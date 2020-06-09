import { fillModal } from './modalFiller';
import { toggleModal } from './init';

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

const handleEvent = (trip) => {
    fillModal(trip, 'Save Trip', -1);
    toggleModal();
};

/* Function that called on form */
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

    trip.success ? handleEvent(trip.trip) : alert('Couldn\'t find city with this name');
};
