import { deleteTrip } from './init';
import { addTripToUI } from './trip';

const clearModal = () => {
    document.getElementById('amount_of_days').innerHTML = '';
    document.getElementById('high_temp').innerHTML = '';
    document.getElementById('low_temp').innerHTML = '';
    document.getElementById('weather').innerHTML = '';
};

export const fillModalWindow = (trip, actionButton, id) => {
    const now = new Date();
    now.setHours(0,0,0,0);
    const timeOffset = now.getTimezoneOffset() * 60000;
    const date = new Date(trip.departDate);
    const diff = (trip.departDate - now + timeOffset)/1000/60/60/24;

    clearModal();
    document.getElementById('modal_img').src = trip.imageUrl;
    document.querySelectorAll('.city').forEach(item =>{item.innerHTML = trip.city;});
    document.querySelectorAll('.country').forEach(item =>{item.innerHTML = trip.country;});
    document.getElementById('date').innerHTML = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    document.getElementById('modal_button').value = actionButton;
    document.getElementById('modal_button').setAttribute('data-id', id);

    if (diff === 0) {
        document.getElementById('amount_of_days').innerHTML = 'is today &#128131;';
    }else if (diff < 0) {
        document.getElementById('amount_of_days').innerHTML = `was ${diff * -1} days ago`;
    } else if (diff === 1) {
        document.getElementById('amount_of_days').innerHTML = `is tomorrow`;
    } else {
        document.getElementById('amount_of_days').innerHTML = `is ${diff} days away`;
    }

    if (trip.highTemp && trip.lowTemp) {
        document.getElementById('high_temp').innerHTML = `High: ${trip.highTemp}&#8451;`;
        document.getElementById('low_temp').innerHTML = `, Low: ${trip.lowTemp}&#8451;`;
    }

    if (trip.weather) {
        document.getElementById('weather').innerHTML = trip.weather;
    }
}

export const saveOrDeleteTrip = async (event) => {
    const buttonValue = document.getElementById('modal_button').value;
 
    if (buttonValue === 'Save Trip') {
        const request = await fetch('http://localhost:5000/saveTrip');
        const res = await request.json();
        addTripToUI(res.id, res.trip);
        window.location.reload();
    } else if (buttonValue === 'Delete Trip') {
        const id = event.target.dataset.id;
        const item = document.querySelector('.trip_detail[data-id="' + id + '"]');
        deleteTrip(id, item);
    }

    toggleModal();
};

export const toggleModal = () => {
    document.getElementById('trip_modal').classList.toggle("show-modal");
}

