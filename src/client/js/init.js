import { fillModal } from './modalFiller';
import { addTripToUI } from './tripFiller';
import { setActiveNavMenu } from './menu';

const updateUI = async () => {
    const request = await fetch('http://localhost:5000/trips');
    const trips = await request.json();

    for (let key in trips) {
        addTripToUI(key, trips[key]);
    }
    setActiveNavMenu();
};

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

export const toggleModal = () => {
    document.getElementById('trip_modal').classList.toggle("show-modal");
};

const getTrip = async (id) => {
    const request = await fetch('http://localhost:5000/trip/' + id);
    const res = await request.json();
    if (res.success) {
        return res.trip;
    }
    return null;
};

const tripAction = async (event, id, item) => {
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

const toggleTrips = () => {
    document.querySelectorAll('.trip_detail').forEach(item => item.classList.toggle('hidden'));
};

export const init = async () => {
    await updateUI();

    document.addEventListener('scroll', setActiveNavMenu);
    document.querySelector(".close").addEventListener("click", toggleModal);
    document.getElementById('modal_button').addEventListener('click', modalAction);
    document.querySelectorAll(".trip_detail").forEach(function(item) {
        const id = item.dataset.id;
        item.addEventListener('click', function(e) {tripAction(e, id, item);});
    });
    document.querySelectorAll(".radio_label").forEach(function(item) {
        item.addEventListener('click', toggleTrips);
    });
};
