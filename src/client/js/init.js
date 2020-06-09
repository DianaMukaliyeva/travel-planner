import { fillModal } from './modalFiller';
import { addTripToUI } from './tripFiller';
import { setActiveNavMenu } from './menu';

/** function that update UI when window is load. */
const updateUI = async () => {
    //get the information of all trips from the server
    const request = await fetch('http://localhost:5000/trips');
    const trips = await request.json();

    //add all trips to UI
    for (let key in trips) {
        addTripToUI(key, trips[key]);
    }

    //set 'active-class' to navigation menu
    setActiveNavMenu();
};

/**
 * function that sends delete request to the server
 * and remove element from the DOM.
 * @param {id} integer - id of the trip,
 * @param {item} html_element - html element that shows trip,
*/
const deleteTrip = async (id, item) => {
    const confirmation = confirm('Are you sure you want to delete this trip?');
    if (confirmation) {
        const request = await fetch('http://localhost:5000/trips/' + id, {
            method: 'DELETE',
        });
        const res = await request.json();
        if (res) {
            item.parentNode.removeChild(item);
        }
    }
};

/**
 * function that called when user clicked the button on modal window.
 * Depends on what value button contains it will act differently.
 * @param {event} event an event on click on the trip,
*/
const modalAction = async (event) => {
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

/** function that shows of hides modal window */
export const toggleModal = () => {
    document.getElementById('trip_modal').classList.toggle("show-modal");
};

/**
 * function that gets trip with given id from the server.
 * @param {id} number id of the trip
*/
const getTrip = async (id) => {
    const request = await fetch('http://localhost:5000/trip/' + id);
    const res = await request.json();
    if (res.success) {
        return res.trip;
    }
    return null;
};

/**
 * function that sends post request to the server.
 * @param {event} event an event on click on the trip,
 * @param {id} number id of the trip,
 * @param {item} html_element html element contains the trip
*/
const tripAction = async (event, id, item) => {
    //if was clicked button delete, than call function deleteTrip,
    //otherwise open modal window with information of the trip
    if (event.target.name == 'delete') {
        deleteTrip(id, item);
    } else {
        const trip = await getTrip(id);

        if (trip) {
            fillModal(trip, 'Delete Trip', id);
            toggleModal();
        }
    }
};

/** function that shows of hides past or future trips */
const toggleTrips = () => {
    document.querySelectorAll('.trip_detail').forEach(item => item.classList.toggle('hidden'));
};

/** 
 * function that updates UI when content is load and
 * adds all needed event listeners
*/
export const init = async () => {
    await updateUI();

    //event listener to update navigation menu
    document.addEventListener('scroll', setActiveNavMenu);

    //event listeners to modal window
    document.querySelector(".close").addEventListener("click", toggleModal);
    document.getElementById('modal_button').addEventListener('click', modalAction);

    //event listeners to every trip
    document.querySelectorAll(".trip_detail").forEach(function(item) {
        const id = item.dataset.id;
        item.addEventListener('click', function(e) {tripAction(e, id, item);});
    });

    //event listeners to show future or past trips
    document.querySelectorAll(".radio_label").forEach(function(item) {
        item.addEventListener('click', toggleTrips);
    });
};
