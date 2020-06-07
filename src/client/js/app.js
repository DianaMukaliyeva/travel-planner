import { fillModalWindow } from './modal';
import { toggleModal } from './modal';

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
    fillModalWindow(trip, 'Save Trip');
    toggleModal();
};

export const handleSearch = async (event) => {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const date = document.getElementById('depart_date').value;
    const now = new Date();
    const timeOffset = now.getTimezoneOffset() * 60000;

    const data = {city: city, departDate: date, timeOffset: timeOffset};
    const trip = await getTripInformation('http://localhost:5000/tripInfo', data);

    trip.success ? handleEvent(trip.trip) : alert('Couldn\'t find city with this name');
};
